package com.example.fresherwelcome.dto;
import com.example.fresherwelcome.model.ActivityType;
import jakarta.validation.constraints.*;
public class PerformanceRequestDto {

    @NotNull
    private Long userId;

    @NotBlank
    private String activityName;

    @NotNull
    private String activityType;

    @NotBlank
    @Pattern(regexp = "^[0-5][0-9]:[0-5][0-9]$", message = "Duration must be in mm:ss format")
    private String duration;

    @NotNull
    @Min(1)
    private Integer numberOfMembers;

    @NotBlank
    private String telegramUsername;

    @NotBlank
    private String activityDescription;

    // --- Constructors ---
    public PerformanceRequestDto() {}

    public PerformanceRequestDto(Long userId, String activityName, String activityType,
                                 String duration, Integer numberOfMembers,
                                 String telegramUsername, String activityDescription) {
        this.userId = userId;
        this.activityName = activityName;
        this.activityType = activityType;
        this.duration = duration;
        this.numberOfMembers = numberOfMembers;
        this.telegramUsername = telegramUsername;
        this.activityDescription = activityDescription;
    }

    // --- Getters & Setters ---
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

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
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
