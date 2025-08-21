package com.example.fresherwelcome.controller;
import com.example.fresherwelcome.model.Event;
import com.example.fresherwelcome.service.EventService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/protected")
public class TemplateController {

    private final EventService eventService;

    public TemplateController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/home")
    public String home() {
        System.out.println("Home page requested");
        return "notStatic/home";  // resolves to templates/notStatic/home.html
    }



    @GetMapping("/feed")
    public String feed() {
        System.out.println("Feedback Page Requested");
        return "notStatic/feed";
    }

    @GetMapping("/view")
    public String showEventsPage(Model model) {
        List<Event> events = eventService.getAllEvents();
        // Debug: check if events have IDs
        model.addAttribute("events", events);
        return "notStatic/view"; // corresponds to templates/events.html
    }


    @GetMapping("/event/{id}")
    public String getEventById(@PathVariable Long id, Model model) {
        Event event = eventService.getEventById(id);

        model.addAttribute("event", event);
        return "notStatic/event-detail"; // will create event-detail.html
    }
}
