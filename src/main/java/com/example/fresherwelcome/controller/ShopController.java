package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.ShopDto;
import com.example.fresherwelcome.model.Shop;
import com.example.fresherwelcome.service.ShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    private final ShopService shopService;

    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    // Create or update shop
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> uploadShop(
            @RequestParam("shopName") String shopName,
            @RequestParam("imageFile") MultipartFile imageFile) {

        System.out.println("DEBUG: Received upload request for shop: " + shopName);

        if (imageFile.isEmpty()) {
            System.out.println("DEBUG: No file received");
            return ResponseEntity.badRequest().body("No image file provided");
        }

        try {
            Shop savedShop = shopService.saveShopWithImage(shopName, imageFile);
            System.out.println("DEBUG: Upload process completed successfully");
            return ResponseEntity.ok(savedShop);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("DEBUG: Error saving file: " + e.getMessage());
            return ResponseEntity.status(500).body("Error saving shop image");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/available")
    public ResponseEntity<List<ShopDto>> getAvailableShopNames() {
        return ResponseEntity.ok(shopService.getAvailableShopNames());
    }

}
