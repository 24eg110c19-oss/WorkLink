
package com.anurag.aiml;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Integer> {

    boolean existsByJobIdAndWorkerId(Integer jobId, Integer workerId);

    List<JobApplication> findByWorkerId(Integer workerId);

    List<JobApplication> findByJobId(Integer jobId);
}