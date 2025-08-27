package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.UserMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserMessageRepo extends JpaRepository<UserMessage, Long> {

    // Optional: fetch all messages for a specific user
    List<UserMessage> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<UserMessage> findByUserId(Long userId);

    @Query("SELECT COUNT(m) FROM UserMessage m WHERE m.user.id = :userId AND m.status = com.example.fresherwelcome.model.MessageStatus.UNREAD")
    long countUnreadMessagesByUserId(@Param("userId") Long userId);


    @Modifying
    @Query("UPDATE UserMessage m SET m.status = 'READ' WHERE m.id IN :ids AND m.status = 'UNREAD'")
    int markAsReadBulk(@Param("ids") List<Long> ids);
}
