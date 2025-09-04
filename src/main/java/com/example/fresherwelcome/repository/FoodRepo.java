package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.Food;
import com.example.fresherwelcome.model.FoodBusiness;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepo  extends JpaRepository<Food, Long> {

    // Custom query: get all foods by shop
    List<Food> findByShop(FoodBusiness shop);

    // OR if you want to find by shopId directly
    List<Food> findByShop_BusinessId(Long businessId);
}
