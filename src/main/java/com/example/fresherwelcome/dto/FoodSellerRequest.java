package com.example.fresherwelcome.dto;

public class FoodSellerRequest {

    private String telegramUsername;
    private String foodName;
    private Long shopId;      // Foreign Key reference
    private Long userId;      // Foreign Key reference
    private String currentSemester; // Expect string like "1 Sem", "2 Sem", ...
    private Integer numberOfMembers;
    private Integer price;
    private Boolean isFoodSet = false; // optional, default false
    private String foodDescription;    // optional

    public FoodSellerRequest() {}

    // Getters and Setters
    public String getTelegramUsername() {
        return telegramUsername;
    }

    public void setTelegramUsername(String telegramUsername) {
        this.telegramUsername = telegramUsername;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCurrentSemester() {
        return currentSemester;
    }

    public void setCurrentSemester(String currentSemester) {
        this.currentSemester = currentSemester;
    }

    public Integer getNumberOfMembers() {
        return numberOfMembers;
    }

    public void setNumberOfMembers(Integer numberOfMembers) {
        this.numberOfMembers = numberOfMembers;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean getIsFoodSet() {
        return isFoodSet;
    }

    public void setIsFoodSet(Boolean isFoodSet) {
        this.isFoodSet = isFoodSet;
    }

    public String getFoodDescription() {
        return foodDescription;
    }

    public void setFoodDescription(String foodDescription) {
        this.foodDescription = foodDescription;
    }
}
