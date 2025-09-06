package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.CartDto;
import com.example.fresherwelcome.dto.OrderViewDto;
import com.example.fresherwelcome.dto.PerApprovedDto;
import com.example.fresherwelcome.model.Order;
import com.example.fresherwelcome.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order placeOrder(@RequestBody CartDto cartDto) {
        return orderService.createOrder(cartDto);
    }

    @GetMapping("/unmarked")
    public ResponseEntity<Map<String, Object>> getUnmarkedOrders(
            @RequestParam Long shopId, // Added shopId param
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Page<OrderViewDto> pPage = orderService.getAllUnmarkedOrders(shopId, page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", pPage.getContent());
        response.put("totalElements", pPage.getTotalElements());
        response.put("totalPages", pPage.getTotalPages());
        response.put("currentPage", pPage.getNumber());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/mark/{orderId}")
    public ResponseEntity<String> markOrder(@PathVariable Long orderId) {
        orderService.markOrder(orderId);
        return ResponseEntity.ok("Order marked successfully");
    }

}
