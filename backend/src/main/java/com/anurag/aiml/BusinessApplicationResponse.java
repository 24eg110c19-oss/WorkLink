package com.anurag.aiml;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BusinessApplicationResponse {

    private Integer applicationId;
    private Integer jobId;
    private String jobTitle;
    private String applicationStatus;
    private LocalDateTime appliedAt;

    private Integer workerId;
    private String workerName;
    private String skills;
    private String location;
    private Integer experienceYears;
    private Boolean availability;
    private BigDecimal rating;

    public BusinessApplicationResponse(
            Integer applicationId,
            Integer jobId,
            String jobTitle,
            String applicationStatus,
            LocalDateTime appliedAt,
            Integer workerId,
            String workerName,
            String skills,
            String location,
            Integer experienceYears,
            Boolean availability,
            BigDecimal rating) {

        this.applicationId = applicationId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.applicationStatus = applicationStatus;
        this.appliedAt = appliedAt;

        this.workerId = workerId;
        this.workerName = workerName;
        this.skills = skills;
        this.location = location;
        this.experienceYears = experienceYears;
        this.availability = availability;
        this.rating = rating;
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

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public Integer getWorkerId() {
        return workerId;
    }

    public String getWorkerName() {
        return workerName;
    }

    public String getSkills() {
        return skills;
    }

    public String getLocation() {
        return location;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public BigDecimal getRating() {
        return rating;
    }
}
