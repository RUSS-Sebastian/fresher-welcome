package com.example.fresherwelcome.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class VolunteerRequestDto {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Telegram username is required")
    private String telegramUsername;

    @NotNull(message = "Current semester is required")
    private String currentSemester; // Will be converted to enum in service

    @NotNull(message = "Preferred role is required")
    private String preferredRole; // Will be converted to enum in service

    @NotNull(message = "Availability is required")
    private String availability; // Will be converted to enum in service

    @Size(max = 5000, message = "Skills/experience can be max 5000 characters")
    private String skillsExperience;

    @Size(max = 5000, message = "Reason can be max 5000 characters")
    private String reason;



    @NotNull(message = "User ID is required")
    private Long userId;


    // --- Getters & Setters ---
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTelegramUsername() {
        return telegramUsername;
    }

    public void setTelegramUsername(String telegramUsername) {
        this.telegramUsername = telegramUsername;
    }

    public String getCurrentSemester() {
        return currentSemester;
    }

    public void setCurrentSemester(String currentSemester) {
        this.currentSemester = currentSemester;
    }

    public String getPreferredRole() {
        return preferredRole;
    }

    public void setPreferredRole(String preferredRole) {
        this.preferredRole = preferredRole;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getSkillsExperience() {
        return skillsExperience;
    }

    public void setSkillsExperience(String skillsExperience) {
        this.skillsExperience = skillsExperience;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

}
