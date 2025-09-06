package com.example.fresherwelcome.dto;

public class OrderItemViewDto {
    private String foodName;
    private int quantity;

    public OrderItemViewDto(String foodName, int quantity) {
        this.foodName = foodName;
        this.quantity = quantity;
    }

    public String getFoodName() {
        return foodName;
    }

    public int getQuantity() {
        return quantity;
    }
}
