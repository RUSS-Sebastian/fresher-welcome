package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.FoodResponseDTO;
import com.example.fresherwelcome.service.FoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {


    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    // Add food for a specific shop
    @PostMapping("/{shopId}/add")
    public ResponseEntity<?> addFood(
            @PathVariable Long shopId,
            @RequestParam("foodName") String foodName,
            @RequestParam("foodDescription") String foodDescription,
            @RequestParam("foodPrice") BigDecimal foodPrice,
            @RequestParam("imageFile") MultipartFile imageFile
    ) {

        if (imageFile.isEmpty()) {
            System.out.println("DEBUG: No file received");
            return ResponseEntity.badRequest().body("No image file provided");
        }

        try {

            FoodResponseDTO savedBusiness = foodService.addFoodToShop(shopId, foodName, foodDescription, foodPrice, imageFile);
            return ResponseEntity.ok(savedBusiness);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("DEBUG: Error saving file: " + e.getMessage());
            return ResponseEntity.status(500).body("Error saving business image");
        }
    }


    // Get all foods for a shop
    @GetMapping("/shop/{shopId}")
    public List<FoodResponseDTO> getFoodsByShop(@PathVariable Long shopId) {
        return foodService.getFoodsByShopId(shopId);
    }

    @DeleteMapping("/{foodId}")
    public ResponseEntity<?> deleteFood(@PathVariable Long foodId) {
        try {
            foodService.deleteFoodById(foodId);
            return ResponseEntity.ok("Food deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error deleting food image");
        }
    }
}
