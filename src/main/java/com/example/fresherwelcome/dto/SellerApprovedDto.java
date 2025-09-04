package com.example.fresherwelcome.dto;

import java.math.BigDecimal;

public class SellerApprovedDto {
    private String fullName;
    private String telegramUsername;
    private String currentSemester;
    private String foodName;
    private BigDecimal price;
    private String preferredLocation;
    private boolean isFoodSet;
    private String foodDescription;

    public SellerApprovedDto(String fullName, String telegramUsername, String currentSemester, String foodName, BigDecimal price, String preferredLocation, boolean isFoodSet, String foodDescription) {
        this.fullName = fullName;
        this.telegramUsername = telegramUsername;
        this.currentSemester = currentSemester;
        this.foodName = foodName;
        this.price = price;
        this.preferredLocation = preferredLocation;
        this.isFoodSet = isFoodSet;
        this.foodDescription = foodDescription;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getTelegramUsername() {
        return telegramUsername;
    }

    public void setTelegramUsername(String telegramUsername) {
        this.telegramUsername = telegramUsername;
    }

    public String getCurrentSemester() {
        return currentSemester;
    }

    public void setCurrentSemester(String currentSemester) {
        this.currentSemester = currentSemester;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getPreferredLocation() {
        return preferredLocation;
    }

    public void setPreferredLocation(String preferredLocation) {
        this.preferredLocation = preferredLocation;
    }

    public boolean isFoodSet() {
        return isFoodSet;
    }

    public void setFoodSet(boolean foodSet) {
        isFoodSet = foodSet;
    }

    public String getFoodDescription() {
        return foodDescription;
    }

    public void setFoodDescription(String foodDescription) {
        this.foodDescription = foodDescription;
    }
}
