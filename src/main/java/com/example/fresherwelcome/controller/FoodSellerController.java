package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.FoodSellerRequest;
import com.example.fresherwelcome.dto.FoodSellerUpdateDto;
import com.example.fresherwelcome.dto.SellerResponseDto;
import com.example.fresherwelcome.model.FoodSeller;
import com.example.fresherwelcome.service.FoodSellerService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/food-sellers")
public class FoodSellerController {

    private final FoodSellerService foodSellerService;

    public FoodSellerController(FoodSellerService foodSellerService) {
        this.foodSellerService = foodSellerService;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitFoodSeller(@RequestBody FoodSellerRequest request) {
        try {
            FoodSeller saved = foodSellerService.saveFoodSeller(request);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/pending")
    public ResponseEntity<Map<String, Object>> getVolunteerForms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "submittedTime") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Page<SellerResponseDto> pPage = foodSellerService.getAllPending(page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", pPage.getContent());
        response.put("totalElements", pPage.getTotalElements());
        response.put("totalPages", pPage.getTotalPages());
        response.put("currentPage", pPage.getNumber());

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{formId}")
    public ResponseEntity<SellerResponseDto> updateFoodSeller(
            @PathVariable Long formId,
            @RequestBody FoodSellerUpdateDto updateDto) {
        SellerResponseDto updatedSeller = foodSellerService.updateFoodSeller(formId, updateDto);
        return ResponseEntity.ok(updatedSeller);
    }
}