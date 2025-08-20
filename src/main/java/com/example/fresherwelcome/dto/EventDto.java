package com.example.fresherwelcome.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EventDto {
    @NotBlank(message = "Event name is required")
    private String eventName;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "UserId is required")
    private Long userId;

    // Constructor
    public EventDto(String eventName, String description, String location,Long userId) {
        this.eventName = eventName;
        this.description = description;
        this.location = location;
        this.userId = userId;
    }

    // Getters & Setters

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
