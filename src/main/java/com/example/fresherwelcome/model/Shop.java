package com.example.fresherwelcome.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "shops")
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Long shopId;

    @Column(name = "shop_name", nullable = false)
    private String shopName;

    @Column(name = "shop_image_path")
    private String shopImagePath;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL)
    private List<FoodSeller> sellers;

    // --- Constructors ---
    public Shop() {
    }

    public Shop(String shopName, String shopImagePath, Boolean isAvailable) {
        this.shopName = shopName;
        this.shopImagePath = shopImagePath;
        this.isAvailable = isAvailable;
    }

    // --- Getters & Setters ---
    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getShopImagePath() {
        return shopImagePath;
    }

    public void setShopImagePath(String shopImagePath) {
        this.shopImagePath = shopImagePath;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public List<FoodSeller> getSellers() {
        return sellers;
    }

    public void setSellers(List<FoodSeller> sellers) {
        this.sellers = sellers;
    }
}
