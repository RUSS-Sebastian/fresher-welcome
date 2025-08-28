package com.example.fresherwelcome.dto;

public class PerApprovedDto {

    private long userId;
    private String activityName;
    private String duration;
    private Integer numberOfMembers;
    private String telegramUsername;
    private String activityDescription;

    // Constructor
    public PerApprovedDto(Long userId, String activityName, String duration,
                          Integer numberOfMembers, String telegramUsername, String activityDescription) {
        this.userId = userId;
        this.activityName = activityName;
        this.duration = duration;
        this.numberOfMembers = numberOfMembers;
        this.telegramUsername = telegramUsername;
        this.activityDescription = activityDescription;
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
}
