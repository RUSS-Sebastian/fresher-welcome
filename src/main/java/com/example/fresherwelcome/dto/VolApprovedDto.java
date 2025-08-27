package com.example.fresherwelcome.dto;

public class VolApprovedDto {
    private String fullName;
    private String telegramUsername;
    private String currentSemester;
    private String preferredRole;
    private String availability;

    // --- Constructor ---
    public VolApprovedDto(
            String fullName,
            String telegramUsername,
            String currentSemester,
            String preferredRole,
            String availability
    ) {
        this.fullName = fullName;
        this.telegramUsername = telegramUsername;
        this.currentSemester = currentSemester;
        this.preferredRole = preferredRole;
        this.availability = availability;
    }

    // --- Getters & Setters ---

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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
}

