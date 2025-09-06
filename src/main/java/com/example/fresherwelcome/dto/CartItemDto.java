package com.example.fresherwelcome.dto;

public class CartItemDto {
    private Long foodId;
    private int quantity;
     // price at the time of ordering

    // Getters and Setters
    public Long getFoodId() { return foodId; }
    public void setFoodId(Long foodId) { this.foodId = foodId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

}
