package com.example.fresherwelcome.controller;


import com.example.fresherwelcome.dto.BusinessDto;
import com.example.fresherwelcome.model.FoodBusiness;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.service.BusinessService;
import com.example.fresherwelcome.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/business")
public class FoodBusinessController {

    private final BusinessService businessService;
    private final UserService userService;


    public FoodBusinessController(BusinessService businessService,UserService userService) {
        this.businessService = businessService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> uploadBusiness(
            @RequestParam("businessName") String businessName,
            @RequestParam("imageFile") MultipartFile imageFile,
            @RequestParam("businessDescription") String description,
            Authentication authentication) {

        System.out.println("DEBUG: Received upload request for business: " + businessName);

        if (imageFile.isEmpty()) {
            System.out.println("DEBUG: No file received");
            return ResponseEntity.badRequest().body("No image file provided");
        }

        try {

            User user = userService.getCurrentUser(authentication);
            FoodBusiness savedBusiness = businessService.saveOrUpdateBusinessWithImage(businessName, imageFile, description, user.getId());
            BusinessDto dto = businessService.toDto(savedBusiness);
            System.out.println("DEBUG: Upload process completed successfully");
            return ResponseEntity.ok(dto);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("DEBUG: Error saving file: " + e.getMessage());
            return ResponseEntity.status(500).body("Error saving business image");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<BusinessDto> getMyBusiness(Authentication authentication) {
        BusinessDto dto = businessService.getBusinessForCurrentUser(authentication);
        return ResponseEntity.ok(dto);
    }
}
