package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.PerApprovedDto;
import com.example.fresherwelcome.dto.PerformanceRequestDto;
import com.example.fresherwelcome.dto.PerformanceResponseDto;
import com.example.fresherwelcome.model.Performance;
import com.example.fresherwelcome.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.fresherwelcome.service.PerformanceService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/performances")
public class  PerformanceController {

    private final PerformanceService performanceService;

    public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }

    @PostMapping
    public ResponseEntity<?> createPerformance(@RequestBody PerformanceRequestDto dto) {
        try {
            Performance performance = performanceService.savePerformance(dto);
            return ResponseEntity.ok(Map.of("message", "Performance form submitted successfully!"));
        } catch (IllegalStateException e) {
            // One-to-one violation
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
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
        Page<PerformanceResponseDto> pPage = performanceService.getAllPending(page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", pPage.getContent());
        response.put("totalElements", pPage.getTotalElements());
        response.put("totalPages", pPage.getTotalPages());
        response.put("currentPage", pPage.getNumber());

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/approved")
    public ResponseEntity<Map<String, Object>> getApprovedForms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "activity_name") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Page<PerApprovedDto> pPage = performanceService.getAllApprovedPerformances(page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", pPage.getContent());
        response.put("totalElements", pPage.getTotalElements());
        response.put("totalPages", pPage.getTotalPages());
        response.put("currentPage", pPage.getNumber());

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<PerformanceResponseDto> updateVolunteerStatus(
            @PathVariable Long id,
            @RequestParam Status status // expects APPROVED or REJECTED
    ) {
        PerformanceResponseDto updatedPerformance = performanceService.updateStatus(id, status);
        return ResponseEntity.ok(updatedPerformance);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/count/approved")
    public ResponseEntity<Long> getApprovedPerformancesCount() {
        long count = performanceService.countApprovedPerformances();
        return ResponseEntity.ok(count);
    }

}
