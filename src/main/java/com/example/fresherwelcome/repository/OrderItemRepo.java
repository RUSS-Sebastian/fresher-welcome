package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {

    // Find all items by a specific order
    List<OrderItem> findByOrderOrderId(Long orderId);

}
