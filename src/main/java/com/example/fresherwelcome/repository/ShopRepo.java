package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepo extends JpaRepository<Shop, Long> {
    List<Shop> findByIsAvailableTrue();
}