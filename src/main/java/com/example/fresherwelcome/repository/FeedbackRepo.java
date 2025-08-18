package com.example.fresherwelcome.repository;
import com.example.fresherwelcome.model.Feedback;
import com.example.fresherwelcome.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.fresherwelcome.model.FeedbackType;

import java.util.List;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long>{

    // Find all feedback by a specific user
    List<Feedback> findByUser(User user);

    // Find all feedback by user ID
    List<Feedback> findByUser_Id(Long userId);

    // Find feedback by feedback type
    List<Feedback> findByFeedbackType(FeedbackType feedbackType);

    // Optional: find feedback by rating range
    List<Feedback> findByRatingBetween(int min, int max);

    @Query("SELECT f FROM Feedback f " +
            "WHERE LOWER(f.user.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(f.comment) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(f.feedbackType) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Feedback> search(@Param("keyword") String keyword, Pageable pageable);


    @Query("SELECT f.feedbackType AS type, COUNT(f) AS count " +
            "FROM Feedback f GROUP BY f.feedbackType")
    List<FeedbackTypeCount> countByFeedbackType();
}
