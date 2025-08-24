package com.example.fresherwelcome.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "admin_buttons")
public class AdminButton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "button_name", unique = true, nullable = false)
    private String buttonName;

    @Column(name = "status", nullable = false)
    private Boolean status = false;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public AdminButton() {}

    public AdminButton(String buttonName, Boolean status) {
        this.buttonName = buttonName;
        this.status = status;
    }

    // Getters & setters
    public Long getId() { return id; }
    public String getButtonName() { return buttonName; }
    public void setButtonName(String buttonName) { this.buttonName = buttonName; }
    public Boolean getStatus() { return status; }
    public void setStatus(Boolean status) { this.status = status; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}