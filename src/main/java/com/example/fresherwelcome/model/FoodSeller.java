package com.example.fresherwelcome.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "food_seller",
        uniqueConstraints = @UniqueConstraint(columnNames = "telegram_username"))
public class FoodSeller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "form_id")
    private Long formId;

    @Column(name = "telegram_username", nullable = false, unique = true)
    private String telegramUsername;

    @Convert(converter = FoodSeller.SemesterConverter.class)
    @Column(name = "current_semester", nullable = false)
    private FoodSeller.Semester currentSemester;

    @Column(name = "food_name", nullable = false)
    private String foodName;

    // Foreign key to Shop
    @ManyToOne(optional = false) // no LAZY
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @Column(name = "number_of_members", nullable = false)
    private Integer numberOfMembers;

    // Using BigDecimal instead of double/float for money
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private java.math.BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.PENDING; // default

    @Column(name = "is_food_set", nullable = false)
    private boolean isFoodSet; // default

    @Column(name = "food_description")
    private String foodDescription;

    @Column(name = "submitted_time", nullable = false,
            updatable = false, insertable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime submittedTime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false) // foreign key in volunteer table
    private User user;

    // --- Constructors ---
    public FoodSeller() {}


    public enum Semester {
        SEM_1("1 Sem"),
        SEM_2("2 Sem"),
        SEM_3("3 Sem"),
        SEM_4("4 Sem"),
        SEM_5("5 Sem"),
        SEM_6("6 Sem"),
        SEM_7("7 Sem"),
        SEM_8("8 Sem"),
        SEM_9("9 Sem"),
        SEM_10("10 Sem"),
        HIGHER("Higher");

        private final String label;

        Semester(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public static FoodSeller.Semester fromLabel(String dbValue) {
            for (FoodSeller.Semester s : values()) {
                if (s.label.equals(dbValue)) return s;
            }
            throw new IllegalArgumentException("Unknown semester: " + dbValue);
        }
    }

    @Converter(autoApply = false)
    public static class SemesterConverter implements AttributeConverter<FoodSeller.Semester, String> {
        @Override
        public String convertToDatabaseColumn(FoodSeller.Semester attribute) {
            return attribute != null ? attribute.getLabel() : null;
        }
        @Override
        public FoodSeller.Semester convertToEntityAttribute(String dbData) {
            return dbData != null ? FoodSeller.Semester.fromLabel(dbData) : null;
        }
    }

    // --- Getters & Setters ---
    public Long getFormId() {
        return formId;
    }

    public void setFormId(Long formId) {
        this.formId = formId;
    }

    public String getTelegramUsername() {
        return telegramUsername;
    }

    public void setTelegramUsername(String telegramUsername) {
        this.telegramUsername = telegramUsername;
    }

    public Semester getCurrentSemester() {
        return currentSemester;
    }

    public void setCurrentSemester(Semester currentSemester) {
        this.currentSemester = currentSemester;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public Integer getNumberOfMembers() {
        return numberOfMembers;
    }

    public void setNumberOfMembers(Integer numberOfMembers) {
        this.numberOfMembers = numberOfMembers;
    }

    public java.math.BigDecimal getPrice() {
        return price;
    }

    public void setPrice(java.math.BigDecimal price) {
        this.price = price;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
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

    public LocalDateTime getSubmittedTime() {
        return submittedTime;
    }

    public void setSubmittedTime(LocalDateTime submittedTime) {
        this.submittedTime = submittedTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
