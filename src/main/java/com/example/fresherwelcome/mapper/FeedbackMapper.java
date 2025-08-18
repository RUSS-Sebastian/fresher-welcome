package com.example.fresherwelcome.mapper;
import com.example.fresherwelcome.dto.FeedbackDto;
import com.example.fresherwelcome.model.Feedback;

import java.time.format.DateTimeFormatter;

public class FeedbackMapper {

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a"); // Example: 16 Aug 2025, 03:15 PM

    public static FeedbackDto toDto(Feedback feedback) {
        return new FeedbackDto(
                feedback.getUser().getName(),   // extracting username from User entity
                feedback.getComment(),
                feedback.getRating(),
                feedback.getFeedbackType(),
                feedback.getSubmittedAt().format(FORMATTER) // format datetime
        );
    }

}
