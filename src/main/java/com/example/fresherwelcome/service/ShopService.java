package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.ShopDto;
import com.example.fresherwelcome.model.Shop;
import com.example.fresherwelcome.repository.ShopRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ShopService {

    private static final Logger logger = LoggerFactory.getLogger(ShopService.class);

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final ShopRepo shopRepository;

    public ShopService(ShopRepo shopRepository) {
        this.shopRepository = shopRepository;
    }

    public Shop saveShopWithImage(String shopName, MultipartFile imageFile) throws IOException {
        logger.info("Saving shop: {}", shopName);

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
        String imageUrl = "/shops/" + fileName;

        Shop shop = new Shop();
        shop.setShopName(shopName);
        shop.setShopImagePath(imageUrl);
        shop.setIsAvailable(true);

        return shopRepository.save(shop);
    }

    public List<Shop> getAvailableShops() {
        return shopRepository.findByIsAvailableTrue();
    }

    public List<ShopDto> getAvailableShopNames() {
        return shopRepository.findByIsAvailableTrue()
                .stream()
                .map(shop -> new ShopDto(shop.getShopId(), shop.getShopName()))
                .toList();
    }


}
