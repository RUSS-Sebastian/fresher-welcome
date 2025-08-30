package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.PerformanceRequestDto;
import com.example.fresherwelcome.dto.PerformanceResponseDto;
import com.example.fresherwelcome.model.*;
import com.example.fresherwelcome.repository.PerformanceRepo;
import com.example.fresherwelcome.repository.UserRepo;
import com.example.fresherwelcome.dto.PerApprovedDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PerformanceService {

    private final PerformanceRepo performanceRepository;
    private final UserRepo userRepository;

    public PerformanceService(PerformanceRepo performanceRepository, UserRepo userRepository) {
        this.performanceRepository = performanceRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Performance savePerformance(PerformanceRequestDto dto) {

        Optional<User> optionalUser = userRepository.findById(dto.getUserId());
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + dto.getUserId() + " not found");
        }
        User user = optionalUser.get();

        // Check if user already submitted a performance
        if (performanceRepository.existsByUser(user)) {
            // throw a clear exception for one-to-one violation
            throw new IllegalStateException("You have already submitted a performance form.");
        }



        // --- Convert DTO to Entity ---
        Performance p = new Performance();
        p.setUser(user);
        p.setTelegramUsername(dto.getTelegramUsername());
        p.setActivityName(dto.getActivityName());
        // Convert string to enum
        try {
            ActivityType type = ActivityType.valueOf(dto.getActivityType());
            p.setActivityType(type);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid activity type: " + dto.getActivityType());
        }
        p.setDuration(dto.getDuration());
        p.setNumberOfMembers(dto.getNumberOfMembers());
        p.setActivityDescription(dto.getActivityDescription());
        p.setStatus(Status.PENDING); //always default
        p.setSubmittedTime(LocalDateTime.now());
        // Save to DB
        return performanceRepository.save(p);
    }


    public Page<PerformanceResponseDto> getAllPending(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Performance> pPage;


        pPage = performanceRepository.findByStatus(Status.PENDING,pageable);


        return pPage.map(p -> new PerformanceResponseDto(
                p.getUser().getId(),
                p.getActivityName(),
                p.getDuration(),
                p.getNumberOfMembers(),
                p.getTelegramUsername(),
                p.getActivityDescription(),
                p.getStatus(),
                p.getActivityId()
        ));

    }

    public Page<PerApprovedDto> getAllApprovedPerformances(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Performance> pPage;


        pPage = performanceRepository.findByStatus(Status.APPROVED,pageable);


        return pPage.map(p -> new PerApprovedDto(
                p.getUser().getId(),
                p.getActivityName(),
                p.getDuration(),
                p.getNumberOfMembers(),
                p.getTelegramUsername(),
                p.getActivityDescription()
        ));

    }


    public PerformanceResponseDto updateStatus(Long performanceId, Status newStatus) {
        Performance p = performanceRepository.findById(performanceId)
                .orElseThrow(() -> new RuntimeException("Performance not found with ID: " + performanceId));

        // only allow update if current status = PENDING
        if (p.getStatus() != Status.PENDING) {
            throw new IllegalStateException("Performance status is already decided: " + p.getStatus());
        }

        p.setStatus(newStatus);
        performanceRepository.save(p);

        return new PerformanceResponseDto(
                p.getUser().getId(),
                p.getActivityName(),
                p.getDuration(),
                p.getNumberOfMembers(),
                p.getTelegramUsername(),
                p.getActivityDescription(),
                p.getStatus(),
                p.getActivityId()
        );
    }

    public long countApprovedPerformances() {
        return performanceRepository.countByStatus(Status.APPROVED);
    }
}