package com.example.fresherwelcome.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderViewDto {
    private  Long orderId;
    private  Long userId;
    private  BigDecimal totalAmount;
    private  LocalDateTime createdAt;
    private  List<OrderItemViewDto> items;

    public OrderViewDto(Long orderId, Long userId, BigDecimal totalAmount, LocalDateTime createdAt, List<OrderItemViewDto> items) {
        this.orderId = orderId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
        this.items = items;
    }

    public OrderViewDto() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<OrderItemViewDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemViewDto> items) {
        this.items = items;
    }
}
