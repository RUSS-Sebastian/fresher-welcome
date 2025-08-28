package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.VolApprovedDto;
import com.example.fresherwelcome.dto.VolunteerRequestDto;
import com.example.fresherwelcome.dto.VolunteerResponseDto;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.model.Volunteer;
import com.example.fresherwelcome.model.VolunteerStatus;
import com.example.fresherwelcome.repository.UserRepo;
import com.example.fresherwelcome.repository.VolunteerRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class VolunteerService {

    private final VolunteerRepo volunteerRepository;
    private final UserRepo userRepository;

    public VolunteerService(VolunteerRepo volunteerRepository, UserRepo userRepository) {
        this.volunteerRepository = volunteerRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Volunteer saveVolunteer(VolunteerRequestDto dto) {

        Optional<User> optionalUser = userRepository.findById(dto.getUserId());
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + dto.getUserId() + " not found");
        }
        User user = optionalUser.get();

        // --- Convert DTO to Entity ---
        Volunteer volunteer = new Volunteer();
        volunteer.setUser(user);
        volunteer.setTelegramUsername(dto.getTelegramUsername());

        // Map string to enum using labels
        volunteer.setCurrentSemester(Volunteer.Semester.fromLabel(dto.getCurrentSemester()));
        volunteer.setPreferredRole(Volunteer.Role.fromLabel(dto.getPreferredRole()));
        volunteer.setAvailability(Volunteer.Availability.fromLabel(dto.getAvailability()));

        volunteer.setSkillsExperience(dto.getSkillsExperience());
        volunteer.setReason(dto.getReason());

        // Optional field, default to false if null
        volunteer.setIsVolunteer(VolunteerStatus.PENDING); //always default
        volunteer.setSubmittedTime(LocalDateTime.now());

        // Save to DB
        return volunteerRepository.save(volunteer);
    }


    public Page<VolunteerResponseDto> getAllPending(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Volunteer> volPage;


        volPage = volunteerRepository.findByIsVolunteer(VolunteerStatus.PENDING,pageable);


        return volPage.map(vol -> new VolunteerResponseDto(
                vol.getUser().getName(),
                vol.getTelegramUsername(),
                vol.getCurrentSemester().getLabel(),
                vol.getPreferredRole().getLabel(),
                vol.getAvailability().getLabel(),
                vol.getIsVolunteer(),
                vol.getVolunteerId(),
                vol.getUser().getId()
        ));

    }

    public Page<VolApprovedDto> getAllApprovedVolunteers(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Volunteer> volPage;


        volPage = volunteerRepository.findByIsVolunteer(VolunteerStatus.APPROVED,pageable);


        return volPage.map(vol -> new VolApprovedDto(
                vol.getUser().getName(),
                vol.getTelegramUsername(),
                vol.getCurrentSemester().getLabel(),
                vol.getPreferredRole().getLabel(),
                vol.getAvailability().getLabel()
        ));

    }


    public VolunteerResponseDto updateStatus(Long volunteerId, VolunteerStatus newStatus) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(() -> new RuntimeException("Volunteer not found with ID: " + volunteerId));

        // only allow update if current status = PENDING
        if (volunteer.getIsVolunteer() != VolunteerStatus.PENDING) {
            throw new IllegalStateException("Volunteer status is already decided: " + volunteer.getIsVolunteer());
        }

        volunteer.setIsVolunteer(newStatus);
        volunteerRepository.save(volunteer);

        return new VolunteerResponseDto(
                volunteer.getUser().getName(),
                volunteer.getTelegramUsername(),
                volunteer.getCurrentSemester().getLabel(),
                volunteer.getPreferredRole().getLabel(),
                volunteer.getAvailability().getLabel(),
                volunteer.getIsVolunteer(),
                volunteer.getVolunteerId(),
                volunteer.getUser().getId()
        );
    }

    public long countApprovedVolunteers() {
        return volunteerRepository.countByIsVolunteer(VolunteerStatus.APPROVED);
    }
}
