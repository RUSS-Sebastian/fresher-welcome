package com.example.fresherwelcome.dto;
import com.example.fresherwelcome.model.FeedbackType;

public class FeedbackDto {

    private String username;       // extracted from User entity
    private String comment;
    private int rating;
    private FeedbackType feedbackType;
    private String submittedAt;    // formatted string instead of LocalDateTime

    // Constructor
    public FeedbackDto(String username, String comment, int rating, FeedbackType feedbackType, String submittedAt) {
        this.username = username;
        this.comment = comment;
        this.rating = rating;
        this.feedbackType = feedbackType;
        this.submittedAt = submittedAt;
    }

    // Getters & Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public FeedbackType getFeedbackType() { return feedbackType; }
    public void setFeedbackType(FeedbackType feedbackType) { this.feedbackType = feedbackType; }

    public String getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(String submittedAt) { this.submittedAt = submittedAt; }
}