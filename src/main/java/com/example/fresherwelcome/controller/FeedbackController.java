package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.FeedbackDto;
import com.example.fresherwelcome.dto.FeedbackRequest;
import com.example.fresherwelcome.model.Feedback;
import com.example.fresherwelcome.model.FeedbackType;
import com.example.fresherwelcome.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    /**
     * GET /api/feedback/all?page=0&size=10&sortBy=submittedAt&direction=desc
     */
    /*@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getFeedback(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "submittedAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Page<FeedbackDto> feedbackPage = feedbackService.getAllFeedback(page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", feedbackPage.getContent());       // actual DTOs
        response.put("totalElements", feedbackPage.getTotalElements());
        response.put("totalPages", feedbackPage.getTotalPages());
        response.put("currentPage", feedbackPage.getNumber());

        return ResponseEntity.ok(response);
    }*/


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getFeedback(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "submittedAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search
    ) {
        Page<FeedbackDto> feedbackPage = feedbackService.getAllFeedback(page, size, sortBy, direction, search);

        Map<String, Object> response = new HashMap<>();
        response.put("content", feedbackPage.getContent());
        response.put("totalElements", feedbackPage.getTotalElements());
        response.put("totalPages", feedbackPage.getTotalPages());
        response.put("currentPage", feedbackPage.getNumber());

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/counts")
    public ResponseEntity<Map<FeedbackType, Long>> getFeedbackTypeCounts() {
        Map<FeedbackType, Long> counts = feedbackService.getFeedbackTypeCounts();
        return ResponseEntity.ok(counts);
    }

}
