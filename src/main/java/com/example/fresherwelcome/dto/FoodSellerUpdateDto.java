package com.example.fresherwelcome.dto;

import com.example.fresherwelcome.model.Status;

public class FoodSellerUpdateDto {
    private Long shopId;    // optional, can update shop
    private Status status;  // optional, can update status

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
