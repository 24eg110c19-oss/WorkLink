
package com.anurag.aiml;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class JobApplicationController {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final WorkerRepository workerRepository;

    public JobApplicationController(
            JobApplicationRepository applicationRepository,
            JobRepository jobRepository,
            WorkerRepository workerRepository) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.workerRepository = workerRepository;
    }

    // Apply for a job
    @PostMapping
    public ResponseEntity<?> applyForJob(
            @RequestBody Map<String, Integer> request) {

        Integer jobId = request.get("jobId");
        Integer workerId = request.get("workerId");

        if (jobId == null || workerId == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "jobId and workerId are required"));
        }

        if (!jobRepository.existsById(jobId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Job not found"));
        }

        if (!workerRepository.existsById(workerId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Worker not found"));
        }

        if (applicationRepository.existsByJobIdAndWorkerId(
                jobId, workerId)) {

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "message",
                            "You have already applied for this job"));
        }

        JobApplication application = new JobApplication();
        application.setJobId(jobId);
        application.setWorkerId(workerId);
        application.setApplicationStatus("PENDING");

        JobApplication saved =
                applicationRepository.save(application);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saved);
    }

    // View applications submitted by a worker
    @GetMapping("/worker/{workerId}")
    public ResponseEntity<?> getWorkerApplications(
            @PathVariable Integer workerId) {

        if (!workerRepository.existsById(workerId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Worker not found"));
        }

        List<WorkerApplicationResponse> results =
                applicationRepository.findByWorkerId(workerId)
                        .stream()
                        .map(application -> jobRepository
                                .findById(application.getJobId())
                                .map(job -> new WorkerApplicationResponse(
                                        application.getApplicationId(),
                                        application.getJobId(),
                                        job.getTitle(),
                                        job.getRequiredSkills(),
                                        job.getLocation(),
                                        job.getSalary(),
                                        job.getJobType(),
                                        job.getWorkerCount(),
                                        application.getApplicationStatus(),
                                        application.getAppliedAt()))
                                .orElse(null))
                        .filter(result -> result != null)
                        .toList();

        return ResponseEntity.ok(results);
    }

    // View applications with worker profile details
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getJobApplications(
            @PathVariable Integer jobId) {

        var jobOptional = jobRepository.findById(jobId);

        if (jobOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Job not found"));
        }

        Job job = jobOptional.get();

        List<BusinessApplicationResponse> results =
                applicationRepository.findByJobId(jobId)
                        .stream()
                        .map(application -> workerRepository
                                .findById(application.getWorkerId())
                                .map(worker -> new BusinessApplicationResponse(
                                        application.getApplicationId(),
                                        application.getJobId(),
                                        job.getTitle(),
                                        application.getApplicationStatus(),
                                        application.getAppliedAt(),
                                        worker.getWorkerId(),
                                        worker.getFullName(),
                                        worker.getSkills(),
                                        worker.getLocation(),
                                        worker.getExperienceYears(),
                                        worker.getAvailability(),
                                        worker.getRating()))
                                .orElse(null))
                        .filter(result -> result != null)
                        .toList();

        return ResponseEntity.ok(results);
    }

    // Accept an application
    @PutMapping("/{applicationId}/accept")
    public ResponseEntity<?> acceptApplication(
            @PathVariable Integer applicationId) {

        return updateApplicationStatus(
                applicationId, "ACCEPTED");
    }

    // Reject an application
    @PutMapping("/{applicationId}/reject")
    public ResponseEntity<?> rejectApplication(
            @PathVariable Integer applicationId) {

        return updateApplicationStatus(
                applicationId, "REJECTED");
    }

    // Update application status in MySQL
    private ResponseEntity<?> updateApplicationStatus(
            Integer applicationId, String status) {

        return applicationRepository.findById(applicationId)
                .map(application -> {

                    if (!"PENDING".equals(
                            application.getApplicationStatus())) {

                        return ResponseEntity.status(
                                HttpStatus.CONFLICT)
                                .body(Map.of(
                                        "message",
                                        "Only pending applications can be updated"));
                    }

                    application.setApplicationStatus(status);

                    JobApplication updated =
                            applicationRepository.save(application);

                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(Map.of(
                                        "message",
                                        "Application not found")));
    }
}
