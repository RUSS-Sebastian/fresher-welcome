package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

    // Find all orders by a specific user
    List<Order> findByUser(User user);

    Page<Order> findByStatus(Marking status, Pageable pageable);

    Page<Order> findByShop_BusinessIdAndStatus(Long shopId, Marking status, Pageable pageable);


}
