package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.FoodResponseDTO;
import com.example.fresherwelcome.model.Food;
import com.example.fresherwelcome.model.FoodBusiness;
import com.example.fresherwelcome.repository.FoodBusinessRepo;
import com.example.fresherwelcome.repository.FoodRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodService {


    private final FoodRepo foodRepository;

    @Value("${app.upload.business.dir:uploads/foods}")
    private String uploadDir;

    private final FoodBusinessRepo shopRepository;

    public FoodService(FoodRepo foodRepository, FoodBusinessRepo shopRepository) {
        this.foodRepository = foodRepository;
        this.shopRepository = shopRepository;
    }

    // Add new food to a specific shop
    public FoodResponseDTO addFoodToShop(Long shopId, String foodName, String foodDescription, BigDecimal foodPrice, MultipartFile imageFile) throws IOException {
        FoodBusiness shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + shopId));

        // Create directory if it doesn't exist
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            boolean created = dir.mkdirs();
        }

        // Save the file
        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String imageUrl = "/foods/" + fileName;

        Food food = new Food();
        food.setFoodName(foodName);
        food.setFoodDescription(foodDescription);
        food.setFoodPrice(foodPrice);
        food.setFoodImagePath(imageUrl);
        food.setShop(shop);

        Food savedFood = foodRepository.save(food);

        return mapToDTO(savedFood);
    }

    // Get all foods for a shop
    public List<FoodResponseDTO> getFoodsByShopId(Long shopId) {
        List<Food> foods = foodRepository.findByShop_BusinessId(shopId);
        return foods.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private FoodResponseDTO mapToDTO(Food food) {
        return new FoodResponseDTO(
                food.getFoodId(),
                food.getFoodName(),
                food.getFoodDescription(),
                food.getFoodPrice(),
                food.getFoodImagePath(),
                food.getShop().getBusinessId()
        );
    }

    public void deleteFoodById(Long foodId) throws IOException {
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + foodId));

        // Delete the image file from storage
        if (food.getFoodImagePath() != null) {
            String imageFileName = Paths.get(food.getFoodImagePath()).getFileName().toString();
            Path imagePath = Paths.get(uploadDir, imageFileName);

            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
            }
        }

        // Delete food record from DB
        foodRepository.delete(food);
    }
}
