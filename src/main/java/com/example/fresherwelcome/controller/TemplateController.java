package com.example.fresherwelcome.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/protected")
public class TemplateController {
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

}
