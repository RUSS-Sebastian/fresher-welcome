package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.BusinessDto;
import com.example.fresherwelcome.model.FoodBusiness;
import com.example.fresherwelcome.model.Shop;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.repository.FoodBusinessRepo;
import com.example.fresherwelcome.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Service
public class BusinessService {

    private static final Logger logger = LoggerFactory.getLogger(ShopService.class);

    @Value("${app.upload.business.dir:uploads/businesses}")
    private String uploadDir;

    private final FoodBusinessRepo foodBusinessRepository;
    private final UserRepo userRepository;
    private final UserService userService;

    public BusinessService(FoodBusinessRepo foodBusinessRepository,UserRepo userRepository,UserService userService) {
        this.foodBusinessRepository = foodBusinessRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public FoodBusiness saveBusinessWithImage(String businessName, MultipartFile imageFile,String description,long userId) throws IOException {
        logger.info("Saving business: {}", businessName);

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + userId + " not found");
        }
        User user = optionalUser.get();

        // Create directory if it doesn't exist
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            boolean created = dir.mkdirs();
            logger.info("Upload directory created: {}", created);
        }

        // Save the file
        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        logger.info("File saved at: {}", filePath.toAbsolutePath());

        // Build URL (accessible later via WebConfig)
        String imageUrl = "/businesses/" + fileName;

        FoodBusiness business = new FoodBusiness();
        business.setBusinessName(businessName);
        business.setBusinessImagePath(imageUrl);
        business.setBusinessDescription(description);
        business.setUser(user);

        return foodBusinessRepository.save(business);
    }

    // Convert entity to DTO
    public BusinessDto toDto(FoodBusiness business) {
        return new BusinessDto(
                business.getBusinessName(),
                business.getBusinessImagePath(),
                business.getBusinessDescription(),
                business.getBusinessId()
        );
    }

    public BusinessDto getBusinessForCurrentUser(Authentication authentication) {
        User user = userService.getCurrentUser(authentication);

        FoodBusiness business = foodBusinessRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("No business found for user " + user.getId()));

        return toDto(business);
    }

}
