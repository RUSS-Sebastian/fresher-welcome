package com.example.fresherwelcome.dto;

import java.util.List;

public class CartDto {
    private Long userId;
    private Long shopId;
    private List<CartItemDto> items;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getShopId() { return shopId; }
    public void setShopId(Long shopId) { this.shopId = shopId; }

    public List<CartItemDto> getItems() { return items; }
    public void setItems(List<CartItemDto> items) { this.items = items; }
}
