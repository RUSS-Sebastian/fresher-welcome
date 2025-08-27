package com.example.fresherwelcome.dto;



import com.example.fresherwelcome.model.VolunteerStatus;

public class VolunteerResponseDto {
    private String fullName;
    private String telegramUsername;
    private String currentSemester;
    private String preferredRole;
    private String availability;
    private VolunteerStatus isVolunteer; // instead of boolean
    private long volunteer_id;
    private long user_id;

    // --- Constructor ---
    public VolunteerResponseDto(
            String fullName,
            String telegramUsername,
            String currentSemester,
            String preferredRole,
            String availability,
            VolunteerStatus status,
            Long vId,
            Long uId
    ) {
        this.fullName = fullName;
        this.telegramUsername = telegramUsername;
        this.currentSemester = currentSemester;
        this.preferredRole = preferredRole;
        this.availability = availability;
        this.isVolunteer = status;
        this.volunteer_id = vId;
        this.user_id = uId;
    }

    // --- Getters & Setters ---
    public long getVolunteer_id() {
        return volunteer_id;
    }

    public void setVolunteer_id(long volunteer_id) {
        this.volunteer_id = volunteer_id;
    }

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

    public VolunteerStatus getIsVolunteer() {
        return isVolunteer;
    }

    public void setIsVolunteer(VolunteerStatus status) {
        this.isVolunteer = status;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }
}

