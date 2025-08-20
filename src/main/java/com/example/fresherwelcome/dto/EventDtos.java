package com.example.fresherwelcome.dto;

public class EventDtos{
    private String eventName;

    private String description;

    private String location;

    private String userName;


    private Long eventId;

    // Constructor
    public EventDtos(String eventName, String description, String location,String userName,Long eventId) {
        this.eventName = eventName;
        this.description = description;
        this.location = location;
        this.userName = userName;
        this.eventId = eventId;
    }

    // Getters & Setters

    public Long getEventId() {return eventId;}
    public void setEventId(Long eventId) {this.eventId = eventId;}

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
}
