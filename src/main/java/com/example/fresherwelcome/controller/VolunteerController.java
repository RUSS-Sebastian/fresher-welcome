package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.VolunteerRequestDto;
import com.example.fresherwelcome.model.Volunteer;
import com.example.fresherwelcome.service.VolunteerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

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
}
