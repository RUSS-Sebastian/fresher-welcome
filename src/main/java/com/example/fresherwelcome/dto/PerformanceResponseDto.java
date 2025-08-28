package com.example.fresherwelcome.dto;

import com.example.fresherwelcome.model.Status;

public class PerformanceResponseDto {

    private Long userId;
    private String activityName;
    private String duration;
    private Integer numberOfMembers;
    private String telegramUsername;
    private String activityDescription;
    private Status status;

    // Constructor
    public PerformanceResponseDto(Long userId, String activityName, String duration,
                                  Integer numberOfMembers, String telegramUsername,
                                  String activityDescription, Status status) {
        this.userId = userId;
        this.activityName = activityName;
        this.duration = duration;
        this.numberOfMembers = numberOfMembers;
        this.telegramUsername = telegramUsername;
        this.activityDescription = activityDescription;
        this.status = status;
    }

    // Getters & setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getNumberOfMembers() {
        return numberOfMembers;
    }

    public void setNumberOfMembers(Integer numberOfMembers) {
        this.numberOfMembers = numberOfMembers;
    }

    public String getTelegramUsername() {
        return telegramUsername;
    }

    public void setTelegramUsername(String telegramUsername) {
        this.telegramUsername = telegramUsername;
    }

    public String getActivityDescription() {
        return activityDescription;
    }

    public void setActivityDescription(String activityDescription) {
        this.activityDescription = activityDescription;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}

