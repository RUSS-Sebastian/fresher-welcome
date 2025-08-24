package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.AdminButton;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminButtonRepo  extends JpaRepository<AdminButton, Long> {
    Optional<AdminButton> findByButtonName(String buttonName);
}
