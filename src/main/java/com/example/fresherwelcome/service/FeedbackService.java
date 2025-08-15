package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.FeedbackRequest;
import com.example.fresherwelcome.model.Feedback;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.repository.FeedbackRepo;
import com.example.fresherwelcome.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FeedbackService {

    private final FeedbackRepo feedbackRepository;
    private final UserRepo userRepository;

    public FeedbackService(FeedbackRepo feedbackRepository, UserRepo userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }

    public Feedback submitFeedback(FeedbackRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Feedback feedback = new Feedback();
        feedback.setUser(user);
        feedback.setComment(request.getComment());
        feedback.setRating(request.getRating());
        feedback.setFeedbackType(request.getFeedbackType());
        feedback.setSubmittedAt(LocalDateTime.now());

        return feedbackRepository.save(feedback);
    }
}
