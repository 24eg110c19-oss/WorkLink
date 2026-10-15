
package com.anurag.aiml;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class WorkerApplicationResponse {

    private Integer applicationId;
    private Integer jobId;
    private String jobTitle;
    private String requiredSkills;
    private String location;
    private BigDecimal salary;
    private String jobType;
    private Integer workersNeeded;
    private String applicationStatus;
    private LocalDateTime appliedAt;

    public WorkerApplicationResponse() {
    }

    public WorkerApplicationResponse(
            Integer applicationId,
            Integer jobId,
            String jobTitle,
            String requiredSkills,
            String location,
            BigDecimal salary,
            String jobType,
            Integer workersNeeded,
            String applicationStatus,
            LocalDateTime appliedAt) {

        this.applicationId = applicationId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.requiredSkills = requiredSkills;
        this.location = location;
        this.salary = salary;
        this.jobType = jobType;
        this.workersNeeded = workersNeeded;
        this.applicationStatus = applicationStatus;
        this.appliedAt = appliedAt;
    }

    public Integer getApplicationId() {
        return applicationId;
    }

    public Integer getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public String getLocation() {
        return location;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public String getJobType() {
        return jobType;
    }

    public Integer getWorkersNeeded() {
        return workersNeeded;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }
}
