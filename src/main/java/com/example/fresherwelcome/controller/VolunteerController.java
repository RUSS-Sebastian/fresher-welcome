package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.EventDtos;
import com.example.fresherwelcome.dto.VolApprovedDto;
import com.example.fresherwelcome.dto.VolunteerRequestDto;
import com.example.fresherwelcome.dto.VolunteerResponseDto;
import com.example.fresherwelcome.model.Volunteer;
import com.example.fresherwelcome.model.VolunteerStatus;
import com.example.fresherwelcome.service.VolunteerService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/volunteers")
public class  VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @PostMapping
    public ResponseEntity<?> createVolunteer(@RequestBody VolunteerRequestDto dto) {
        try {
            Volunteer volunteer = volunteerService.saveVolunteer(dto);
            return ResponseEntity.ok(Map.of("message", "Volunteer form submitted successfully!"));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Something went wrong"));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/pending")
    public ResponseEntity<Map<String, Object>> getVolunteerForms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "submitted_time") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Page<VolunteerResponseDto> volPage = volunteerService.getAllPending(page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", volPage.getContent());
        response.put("totalElements", volPage.getTotalElements());
        response.put("totalPages", volPage.getTotalPages());
        response.put("currentPage", volPage.getNumber());

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/approved")
    public ResponseEntity<Map<String, Object>> getApprovedForms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "current_semester") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Page<VolApprovedDto> volPage = volunteerService.getAllApprovedVolunteers(page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", volPage.getContent());
        response.put("totalElements", volPage.getTotalElements());
        response.put("totalPages", volPage.getTotalPages());
        response.put("currentPage", volPage.getNumber());

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<VolunteerResponseDto> updateVolunteerStatus(
            @PathVariable Long id,
            @RequestParam VolunteerStatus status // expects APPROVED or REJECTED
    ) {
        VolunteerResponseDto updatedVolunteer = volunteerService.updateStatus(id, status);
        return ResponseEntity.ok(updatedVolunteer);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/count/approved")
    public ResponseEntity<Long> getApprovedVolunteersCount() {
        long count = volunteerService.countApprovedVolunteers();
        return ResponseEntity.ok(count);
    }

}
