package com.example.fresherwelcome.dto;

public class FoodBusinessDTO {

    private Long businessId;
    private String businessName;
    private String businessImagePath;
    private String businessDescription;
    private Long userId;

    // constructor
    public FoodBusinessDTO(Long businessId, String businessName, String businessImagePath,
                           String businessDescription, Long userId) {
        this.businessId = businessId;
        this.businessName = businessName;
        this.businessImagePath = businessImagePath;
        this.businessDescription = businessDescription;
        this.userId = userId;
    }

    // getters and setters
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}

