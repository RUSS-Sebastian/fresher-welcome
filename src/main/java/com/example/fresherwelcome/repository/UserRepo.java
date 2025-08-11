package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    // Optional: find user by email
    Optional<User> findByEmail(String email);

    // Optional: find user by TNT
    Optional<User> findByTnt(String tnt);

    Optional<User> findByName(String name);
}
