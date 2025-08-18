package com.example.fresherwelcome.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String admin(){
        System.out.println("Admin Page Requested");
        return "notStatic/admin";
    }
}
