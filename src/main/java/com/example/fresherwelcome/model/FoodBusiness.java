package com.example.fresherwelcome.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "businesses")
public class FoodBusiness {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_id")
    private Long businessId;

    @Column(name = "business_name", nullable = false)
    private String businessName;

    @Column(name = "business_image_path")
    private String businessImagePath;

    @Column(name="business_description",nullable = false)
    private String businessDescription;

    @OneToOne
    @JoinColumn(name = "user_id") // foreign key in "profiles" table
    private User user;

    // --- Constructors ---
    public FoodBusiness() {
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBusinessImagePath() {
        return businessImagePath;
    }

    public void setBusinessImagePath(String businessImagePath) {
        this.businessImagePath = businessImagePath;
    }

    public String getBusinessDescription() {
        return businessDescription;
    }

    public void setBusinessDescription(String businessDescription) {
        this.businessDescription = businessDescription;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    // --- Getters & Setters ---

}
