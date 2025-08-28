package com.example.fresherwelcome.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "performances")
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId; // primary key

    @NotBlank
    @Column(nullable = false)
    private String activityName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType activityType;

    @NotBlank
    @Column(nullable = false)
    @Pattern(regexp = "^[0-5][0-9]:[0-5][0-9]$", message = "Duration must be in mm:ss format")
    private String duration;

    @NotNull
    @Min(1)
    @Column(nullable = false)
    private Integer numberOfMembers;

    @NotBlank
    @Column(nullable = false)
    private String telegramUsername;

    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String activityDescription;

    @NotNull
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user; // one-to-one with User

    @Column(name = "submitted_time", nullable = false, updatable = false)
    private LocalDateTime submittedTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,name = "status")
    private Status status = Status.PENDING; // default

    // No-args constructor
    public Performance() {this.submittedTime = LocalDateTime.now();}

    // Getters and Setters
    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getSubmittedTime() {
        return submittedTime;
    }

    public void setSubmittedTime(LocalDateTime submittedTime) {
        this.submittedTime = submittedTime;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
