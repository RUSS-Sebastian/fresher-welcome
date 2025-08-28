package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.Performance;
import com.example.fresherwelcome.model.Status;
import com.example.fresherwelcome.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceRepo extends JpaRepository<Performance, Long> {
    Page<Performance> findByStatus(Status status, Pageable pageable);

    long countByStatus(Status status);

    boolean existsByUser(User user);
}
