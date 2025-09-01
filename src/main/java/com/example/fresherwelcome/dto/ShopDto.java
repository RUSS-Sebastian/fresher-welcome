package com.example.fresherwelcome.dto;

public class ShopDto {
    private final Long shopId;
    private final String shopName;

    public ShopDto(Long shopId, String shopName) {
        this.shopId = shopId;
        this.shopName = shopName;
    }

    public Long getShopId() {
        return shopId;
    }

    public String getShopName() {
        return shopName;
    }
}
