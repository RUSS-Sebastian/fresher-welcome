package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.*;
import com.example.fresherwelcome.mapper.sortFieldMapper;
import com.example.fresherwelcome.model.*;
import com.example.fresherwelcome.repository.FoodSellerRepo;
import com.example.fresherwelcome.repository.ShopRepo;
import com.example.fresherwelcome.repository.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FoodSellerService {

    private final FoodSellerRepo foodSellerRepository;
    private final ShopRepo shopRepository;
    private final UserRepo userRepository;

    public FoodSellerService(FoodSellerRepo foodSellerRepository,
                             ShopRepo shopRepository,
                             UserRepo userRepository) {
        this.foodSellerRepository = foodSellerRepository;
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
    }

    public FoodSeller saveFoodSeller(FoodSellerRequest request) throws IllegalArgumentException {
        // --- Get Shop ---
        Optional<Shop> shopOpt = shopRepository.findById(request.getShopId());
        if (!shopOpt.isPresent()) {
            throw new IllegalArgumentException("Shop not found with ID: " + request.getShopId());
        }

        // --- Get User ---
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        if (!userOpt.isPresent()) {
            throw new IllegalArgumentException("User not found with ID: " + request.getUserId());
        }

        // --- Map DTO to Entity ---
        FoodSeller foodSeller = new FoodSeller();
        foodSeller.setTelegramUsername(request.getTelegramUsername());
        foodSeller.setFoodName(request.getFoodName());
        foodSeller.setShop(shopOpt.get());
        foodSeller.setUser(userOpt.get());

        // Convert semester string to enum
        foodSeller.setCurrentSemester(FoodSeller.Semester.fromLabel(request.getCurrentSemester()));

        foodSeller.setNumberOfMembers(request.getNumberOfMembers());
        foodSeller.setPrice(java.math.BigDecimal.valueOf(request.getPrice()));

        // Optional fields
        foodSeller.setFoodSet(request.getIsFoodSet() != null ? request.getIsFoodSet() : false);
        foodSeller.setFoodDescription(request.getFoodDescription());

        // Status & submittedTime are automatically handled by entity defaults

        return foodSellerRepository.save(foodSeller);
    }

    public Page<SellerResponseDto> getAllPending(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<FoodSeller> pPage;


        pPage = foodSellerRepository.findByStatus(Status.PENDING,pageable);


        return pPage.map(p -> new SellerResponseDto(
                p.getUser().getName(),
                p.getTelegramUsername(),
                p.getCurrentSemester().getLabel(),
                p.getFoodName(),
                p.getPrice(),
                p.getShop().getShopName(),
                p.isFoodSet(),
                p.getFoodDescription(),
                p.getStatus(),
                p.getShop().getShopId(),
                p.getFormId(),
                p.getUser().getId()
        ));

    }

    public SellerResponseDto updateFoodSeller(Long formId, FoodSellerUpdateDto dto) {
        FoodSeller seller = foodSellerRepository.findById(formId)
                .orElseThrow(() -> new RuntimeException("FoodSeller not found"));

        if (dto.getShopId() != null) {
            Shop shop = shopRepository.findById(dto.getShopId())
                    .orElseThrow(() -> new RuntimeException("Shop not found"));
            seller.setShop(shop);

            // Update status if provided
            if (dto.getStatus() != null) {
                seller.setStatus(dto.getStatus());

                // Only mark shop unavailable if status is APPROVED
                if (dto.getStatus() == Status.APPROVED) {
                    shop.setIsAvailable(false);
                }
            }
        }


        foodSellerRepository.save(seller);

        return new SellerResponseDto(
                seller.getUser().getName(),
                seller.getTelegramUsername(),
                seller.getCurrentSemester().getLabel(),
                seller.getFoodName(),
                seller.getPrice(),
                seller.getShop().getShopName(),
                seller.isFoodSet(),
                seller.getFoodDescription(),
                seller.getStatus(),
                seller.getShop().getShopId(),
                seller.getFormId(),
                seller.getUser().getId()
        );
    }

    public Page<SellerApprovedDto> getAllApprovedSellers(int page, int size, String sortBy, String direction) {

        sortBy = sortFieldMapper.mapFoodSeller(sortBy);


        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<FoodSeller> pPage;


        pPage = foodSellerRepository.findByStatus(Status.APPROVED,pageable);


        return pPage.map(p -> new SellerApprovedDto(
                p.getUser().getName(),
                p.getTelegramUsername(),
                p.getCurrentSemester().getLabel(),
                p.getFoodName(),
                p.getPrice(),
                p.getShop().getShopName(),
                p.isFoodSet(),
                p.getFoodDescription()
        ));

    }

    public long countApprovedSellers() {
        return foodSellerRepository.countByStatus(Status.APPROVED);
    }

    public boolean hasApprovedSeller(Long userId) {
        return foodSellerRepository.existsByUserIdAndStatus(userId, Status.APPROVED);
    }
}
