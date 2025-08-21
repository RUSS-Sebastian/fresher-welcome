package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.EventDto;
import com.example.fresherwelcome.dto.EventDtos;
import com.example.fresherwelcome.model.Event;
import com.example.fresherwelcome.service.EventService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/event")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@Valid @RequestBody EventDto request) {
        System.out.println("Url Called ");
        Event savedEvent = eventService.createEvent(request);
        return ResponseEntity.ok("Event submitted successfully with ID: " + savedEvent.getEventId());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getEvent(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "event_name") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Page<EventDtos> eventPage = eventService.getAllEvent(page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", eventPage.getContent());
        response.put("totalElements", eventPage.getTotalElements());
        response.put("totalPages", eventPage.getTotalPages());
        response.put("currentPage", eventPage.getNumber());

        return ResponseEntity.ok(response);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<EventDtos> updateEvent(
            @PathVariable Long id,
            @RequestBody EventDto request) {
        System.out.println("PATCH called for Event ID: " + id);
        EventDtos updated = eventService.updateEvent(id, request);
        return ResponseEntity.ok(updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteEvent(@PathVariable("id") Long eventId) {
        eventService.deleteEvent(eventId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Event with ID " + eventId + " has been deleted successfully.");
        return ResponseEntity.ok(response);
    }



}
