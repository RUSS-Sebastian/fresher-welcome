package com.example.fresherwelcome.dto;

import com.example.fresherwelcome.model.Status;

import java.math.BigDecimal;

public class SellerResponseDto {

    private String fullName;
    private String telegramUsername;
    private String currentSemester;
    private String foodName;
    private BigDecimal price;
    private String preferredLocation;
    private boolean isFoodSet;
    private String foodDescription;
    private Status status;
    private long shop_id;
    private long form_id;

    // No-args constructor
    public SellerResponseDto() {
    }

    // All-args constructor
    public SellerResponseDto(String fullName, String telegramUsername, String currentSemester,
                             String foodName, BigDecimal price, String preferredLocation,
                             boolean isFoodSet, String foodDescription, Status status,
                             long shop_id,long seller_id) {
        this.fullName = fullName;
        this.telegramUsername = telegramUsername;
        this.currentSemester = currentSemester;
        this.foodName = foodName;
        this.price = price;
        this.preferredLocation = preferredLocation;
        this.isFoodSet = isFoodSet;
        this.foodDescription = foodDescription;
        this.status = status;
        this.shop_id = shop_id;
        this.form_id = seller_id;
    }

    // Getters and Setters
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

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public long getShop_id() {
        return shop_id;
    }

    public void setShop_id(long shop_id) {
        this.shop_id = shop_id;
    }

    public long getForm_id() {
        return form_id;
    }

    public void setForm_id(long form_id) {
        this.form_id = form_id;
    }
}
