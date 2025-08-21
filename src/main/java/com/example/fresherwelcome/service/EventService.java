package com.example.fresherwelcome.service;


import com.example.fresherwelcome.dto.EventDto;
import com.example.fresherwelcome.dto.EventDtos;
import com.example.fresherwelcome.dto.FeedbackDto;
import com.example.fresherwelcome.mapper.FeedbackMapper;
import com.example.fresherwelcome.model.Event;
import com.example.fresherwelcome.model.Feedback;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.repository.EventRepo;
import com.example.fresherwelcome.repository.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepo eventRepository;
    private final UserRepo userRepository;

    public EventService(EventRepo eventRepository, UserRepo userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    // Create new event
    public Event createEvent(EventDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + dto.getUserId()));
        System.out.println("Service called");
        Event event = new Event();
        event.setEventName(dto.getEventName());
        event.setDescription(dto.getDescription());
        event.setLocation(dto.getLocation());
        event.setCreatedBy(user);

        return eventRepository.save(event);
    }

    public Page<EventDtos> getAllEvent(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Event> eventPage;


        eventPage = eventRepository.findAll(pageable);


        return eventPage.map(event -> new EventDtos(
                event.getEventName(),
                event.getDescription(),
                event.getLocation(),
                event.getCreatedBy().getName(),
                event.getEventId()
        ));

    }


    // Update only editable fields
    public EventDtos updateEvent(Long id, EventDto dto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + id));

        if (dto.getEventName() != null) {
            event.setEventName(dto.getEventName());
        }
        if (dto.getDescription() != null) {
            event.setDescription(dto.getDescription());
        }
        if (dto.getLocation() != null) {
            event.setLocation(dto.getLocation());
        }

        Event saved = eventRepository.save(event);

        return new EventDtos(
                saved.getEventName(),
                saved.getDescription(),
                saved.getLocation(),
                saved.getCreatedBy().getName(),
                saved.getEventId()
        );
    }

    public void deleteEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with ID " + eventId));
        eventRepository.delete(event);
    }

    public List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + id));
    }
}


