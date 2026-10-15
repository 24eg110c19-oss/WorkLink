package com.anurag.aiml;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<Worker, Integer> {

    boolean existsByEmail(String email);
}