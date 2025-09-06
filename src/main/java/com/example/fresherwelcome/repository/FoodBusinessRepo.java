package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.FoodBusiness;
import com.example.fresherwelcome.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FoodBusinessRepo extends JpaRepository<FoodBusiness, Long> {
    Optional<FoodBusiness> findByUserId(Long id);

    Optional<FoodBusiness> findByUser_Id(Long userId);

    Optional<User> findUserByBusinessId(Long businessId);

}
