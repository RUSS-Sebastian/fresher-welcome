package com.example.fresherwelcome.controller;
import com.example.fresherwelcome.model.Event;
import com.example.fresherwelcome.model.Shop;
import com.example.fresherwelcome.service.AdminButtonService;
import com.example.fresherwelcome.service.EventService;
import com.example.fresherwelcome.service.ShopService;
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
    private final AdminButtonService adminButtonService;
    private final ShopService shopService;

    public TemplateController(EventService eventService,AdminButtonService adminButtonService,ShopService shopService) {
        this.eventService = eventService;
        this.adminButtonService =  adminButtonService;
        this.shopService = shopService;
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


    @GetMapping("/index")
    public String index() {
        System.out.println("Registration Page Requested");
        return "notStatic/index";
    }

    @GetMapping("/activity-form")
    public String activity() {
        System.out.println("Activity Form Requested");
        return "notStatic/activity-form";
    }

    @GetMapping("/food")
    public String food(Model model) {
        List<Shop> shops = shopService.getAvailableShops();
        model.addAttribute("shops", shops);

        return "notStatic/food-seller-form";
    }

    @GetMapping("/volunteer")
    public String volunteer() {

        System.out.println("Volunteer Form Requested");
        return "notStatic/volunteer-form";
    }

    @GetMapping("/food-manager")
    public String manager(){
        return "notStatic/food-manager";
    }



}
