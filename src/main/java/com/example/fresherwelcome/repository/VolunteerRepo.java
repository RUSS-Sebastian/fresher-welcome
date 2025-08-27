package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.Volunteer;
import com.example.fresherwelcome.model.VolunteerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VolunteerRepo extends JpaRepository<Volunteer, Long> {

    // Find a volunteer by Telegram username
    Optional<Volunteer> findByTelegramUsername(String telegramUsername);

    // Check if a volunteer exists with given Telegram username
    boolean existsByTelegramUsername(String telegramUsername);

    // Find all volunteers by availability
    List<Volunteer> findByAvailability(Volunteer.Availability availability);

    // Find all volunteers by preferred role
    List<Volunteer> findByPreferredRole(Volunteer.Role preferredRole);

    Optional<Volunteer> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    List<Volunteer> findByIsVolunteer(VolunteerStatus status);

    // Fetch all volunteers with status PENDING, paginated
    Page<Volunteer> findByIsVolunteer(VolunteerStatus status, Pageable pageable);

    long countByIsVolunteer(VolunteerStatus status);
}
