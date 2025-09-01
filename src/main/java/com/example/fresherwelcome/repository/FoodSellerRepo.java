package com.example.fresherwelcome.repository;



import com.example.fresherwelcome.model.FoodSeller;
import com.example.fresherwelcome.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodSellerRepo extends JpaRepository<FoodSeller, Long> {
    Page<FoodSeller> findByStatus(Status status, Pageable pageable);
}
