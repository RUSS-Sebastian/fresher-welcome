package com.example.fresherwelcome.mapper;

public class sortFieldMapper {

    public static String mapFoodSeller(String sortBy) {
        return switch (sortBy) {
            case "fullName" -> "user.name";
            case "preferredLocation" -> "shop.shopName";
            default -> sortBy;
        };
    }

    public static String mapVolunteer(String sortBy) {
        return switch (sortBy) {
            case "fullName" -> "user.name";
            default -> sortBy;
        };
    }

    public static String mapPerformance(String sortBy) {
        return switch (sortBy) {
            case "userId" -> "user.id";
            default -> sortBy;
        };
    }


}