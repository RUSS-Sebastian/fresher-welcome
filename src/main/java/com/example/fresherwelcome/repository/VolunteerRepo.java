package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.Volunteer;
import com.example.fresherwelcome.model.VolunteerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerRepo extends JpaRepository<Volunteer, Long> {



    // Fetch all volunteers with status PENDING, paginated
    Page<Volunteer> findByIsVolunteer(VolunteerStatus status, Pageable pageable);

    long countByIsVolunteer(VolunteerStatus status);
}
