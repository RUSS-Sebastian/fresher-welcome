package com.example.fresherwelcome.model;

import jakarta.persistence.*;

@Entity
@Table(
        name = "event",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "event_name") // enforce unique event_name
        }
)
public class Event{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment primary key
    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "event_name", nullable = false, unique = true)
    private String eventName;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "location", nullable = false)
    private String location;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false) // FK column in event table
    private User createdBy;

    // --- Constructors ---
    public Event() {
    }

    public Event(String eventName, String description, String location, User createdBy) {
        this.eventName = eventName;
        this.description = description;
        this.location = location;
        this.createdBy = createdBy;
    }

    // --- Getters and Setters ---
    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}
