
package com.anurag.aiml;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Get all jobs
    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get only open jobs
    @GetMapping("/open")
    public List<Job> getOpenJobs() {
        return jobRepository.findByStatus("OPEN");
    }

    // Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Integer id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Search jobs by location
    @GetMapping("/search")
    public List<Job> searchJobs(@RequestParam String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    // Post a new job
    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        job.setJobId(null);
        job.setStatus("OPEN");

        Job savedJob = jobRepository.save(job);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
    }
}
