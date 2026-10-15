package com.anurag.aiml;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkerController {

    private final WorkerRepository workerRepository;

    public WorkerController(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    @PostMapping
    public ResponseEntity<?> registerWorker(@RequestBody Worker worker) {

        if (worker.getFullName() == null
                || worker.getFullName().isBlank()
                || worker.getEmail() == null
                || worker.getEmail().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Name and email are required");
        }

        if (workerRepository.existsByEmail(worker.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email is already registered");
        }

        worker.setWorkerId(null);
        worker.setRating(BigDecimal.ZERO);

        if (worker.getExperienceYears() == null) {
            worker.setExperienceYears(0);
        }

        if (worker.getAvailability() == null) {
            worker.setAvailability(true);
        }

        Worker savedWorker = workerRepository.save(worker);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedWorker);
    }

    @GetMapping
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Worker> getWorkerById(
            @PathVariable("id") Integer id) {

        return workerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}