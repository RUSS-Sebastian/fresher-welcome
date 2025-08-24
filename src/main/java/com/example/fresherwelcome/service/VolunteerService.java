package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.VolunteerRequestDto;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.model.Volunteer;
import com.example.fresherwelcome.model.VolunteerStatus;
import com.example.fresherwelcome.repository.UserRepo;
import com.example.fresherwelcome.repository.VolunteerRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        // Check if volunteer record already exists for this user
        Optional<Volunteer> existing = volunteerRepository.findByUserId(dto.getUserId());

        if (existing.isPresent()) {
            Volunteer v = existing.get();

            if (v.getIs_volunteer() == VolunteerStatus.APPROVED) {
                throw new IllegalStateException("User is already an approved volunteer.");
            } else if (v.getIs_volunteer() == VolunteerStatus.PENDING) {
                throw new IllegalStateException("User has already submitted the volunteer form (pending review).");
            }
        }

        Optional<User> optionalUser = userRepository.findById(dto.getUserId());
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + dto.getUserId() + " not found");
        }
        User user = optionalUser.get();

        // --- Convert DTO to Entity ---
        Volunteer volunteer = new Volunteer();
        volunteer.setUser(user);
        volunteer.setFullName(dto.getFullName());
        volunteer.setTelegramUsername(dto.getTelegramUsername());

        // Map string to enum using labels
        volunteer.setCurrentSemester(Volunteer.Semester.fromLabel(dto.getCurrentSemester()));
        volunteer.setPreferredRole(Volunteer.Role.fromLabel(dto.getPreferredRole()));
        volunteer.setAvailability(Volunteer.Availability.fromLabel(dto.getAvailability()));

        volunteer.setSkillsExperience(dto.getSkillsExperience());
        volunteer.setReason(dto.getReason());

        // Optional field, default to false if null
        volunteer.setIs_volunteer(VolunteerStatus.PENDING); //always default

        // Save to DB
        return volunteerRepository.save(volunteer);
    }
}
