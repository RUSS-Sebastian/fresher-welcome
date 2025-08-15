package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.FeedbackRequest;
import com.example.fresherwelcome.model.Feedback;
import com.example.fresherwelcome.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<?> submitFeedback(@Valid @RequestBody FeedbackRequest request) {
        Feedback savedFeedback = feedbackService.submitFeedback(request);
        return ResponseEntity.ok("Feedback submitted successfully with ID: " + savedFeedback.getFeedbackId());
    }
}
