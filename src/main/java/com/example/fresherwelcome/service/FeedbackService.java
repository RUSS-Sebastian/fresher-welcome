package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.FeedbackDto;
import com.example.fresherwelcome.dto.FeedbackRequest;
import com.example.fresherwelcome.mapper.FeedbackMapper;
import com.example.fresherwelcome.model.Feedback;
import com.example.fresherwelcome.model.FeedbackType;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.repository.FeedbackRepo;
import com.example.fresherwelcome.repository.FeedbackTypeCount;
import com.example.fresherwelcome.repository.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    /*public Page<FeedbackDto> getAllFeedback(int page, int size, String sortBy, String direction, String search) {
        //  Build sort order
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        //  Fetch page of Feedback entities
        Page<Feedback> feedbackPage = feedbackRepository.findAll(pageable);

        //  Convert each Feedback entity -> FeedbackDto with formatted date
        return feedbackPage.map(FeedbackMapper::toDto);
    }*/

    public Page<FeedbackDto> getAllFeedback(int page, int size, String sortBy, String direction, String search) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Feedback> feedbackPage;

        if (search != null && !search.trim().isEmpty()) {
            feedbackPage = feedbackRepository.search(search, pageable);
        } else {
            feedbackPage = feedbackRepository.findAll(pageable);
        }

        return feedbackPage.map(FeedbackMapper::toDto);
    }

    public Map<FeedbackType, Long> getFeedbackTypeCounts() {
        List<FeedbackTypeCount> counts = feedbackRepository.countByFeedbackType();
        return counts.stream()
                .collect(Collectors.toMap(FeedbackTypeCount::getType, FeedbackTypeCount::getCount));
    }




}
