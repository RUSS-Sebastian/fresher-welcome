package com.example.fresherwelcome.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "foods")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private Long foodId;

    @Column(name = "food_name", nullable = false)
    private String foodName;

    @Column(name = "food_description", nullable = false, columnDefinition = "TEXT")
    private String foodDescription;

    @Column(name = "food_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal foodPrice;
    // BigDecimal is best for money to avoid floating point issues

    @Column(name = "food_image_path", nullable = false)
    private String foodImagePath;

    @ManyToOne
    @JoinColumn(name = "business_id", nullable = false) // FK to businesses table
    private FoodBusiness shop;

    // Getters & Setters
    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getFoodDescription() {
        return foodDescription;
    }

    public void setFoodDescription(String foodDescription) {
        this.foodDescription = foodDescription;
    }

    public BigDecimal getFoodPrice() {
        return foodPrice;
    }

    public void setFoodPrice(BigDecimal foodPrice) {
        this.foodPrice = foodPrice;
    }

    public String getFoodImagePath() {
        return foodImagePath;
    }

    public void setFoodImagePath(String foodImagePath) {
        this.foodImagePath = foodImagePath;
    }

    public FoodBusiness getShop() {
        return shop;
    }

    public void setShop(FoodBusiness shop) {
        this.shop = shop;
    }
}
