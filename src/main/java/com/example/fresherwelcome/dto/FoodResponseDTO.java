package com.example.fresherwelcome.dto;

import java.math.BigDecimal;

public class FoodResponseDTO {

    private Long foodId;
    private String foodName;
    private String foodDescription;
    private BigDecimal foodPrice;
    private String foodImagePath;
    private Long shopId;

    public FoodResponseDTO(Long foodId, String foodName, String foodDescription,
                           BigDecimal foodPrice, String foodImagePath, Long shopId) {
        this.foodId = foodId;
        this.foodName = foodName;
        this.foodDescription = foodDescription;
        this.foodPrice = foodPrice;
        this.foodImagePath = foodImagePath;
        this.shopId = shopId;
    }

    // Getters and setters
    public Long getFoodId() { return foodId; }
    public void setFoodId(Long foodId) { this.foodId = foodId; }

    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }

    public String getFoodDescription() { return foodDescription; }
    public void setFoodDescription(String foodDescription) { this.foodDescription = foodDescription; }

    public BigDecimal getFoodPrice() { return foodPrice; }
    public void setFoodPrice(BigDecimal foodPrice) { this.foodPrice = foodPrice; }

    public String getFoodImagePath() { return foodImagePath; }
    public void setFoodImagePath(String foodImagePath) { this.foodImagePath = foodImagePath; }

    public Long getShopId() { return shopId; }
    public void setShopId(Long shopId) { this.shopId = shopId; }
}
