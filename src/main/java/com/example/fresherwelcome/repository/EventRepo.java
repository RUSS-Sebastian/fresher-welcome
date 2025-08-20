package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {
    // Find event by name
    Optional<Event> findByEventName(String eventName);

    // Check if event exists by name (useful for validation before save)
    boolean existsByEventName(String eventName);


}

