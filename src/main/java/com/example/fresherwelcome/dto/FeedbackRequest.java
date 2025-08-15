package com.example.fresherwelcome.dto;
import com.example.fresherwelcome.model.FeedbackType;
import jakarta.validation.constraints.*;
public class FeedbackRequest {
    @NotNull
    private Long userId;

    @Size(max = 1000)
    private String comment;

    @Min(1)
    @Max(6)
    private int rating;

    @NotNull
    private FeedbackType feedbackType;

    // Getters & Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public FeedbackType getFeedbackType() { return feedbackType; }
    public void setFeedbackType(FeedbackType feedbackType) { this.feedbackType = feedbackType; }
}
