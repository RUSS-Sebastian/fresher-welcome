package com.example.fresherwelcome.service;

import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.repository.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new user
    public User registerUser(User user) throws IllegalArgumentException {
        // Check if email or TNT already exists
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (userRepo.findByTnt(user.getTnt()).isPresent()) {
            throw new IllegalArgumentException("TNT already in use");
        }

        // TODO: hash the password before saving

        String hashed = passwordEncoder.encode(user.getHashedPassword());
        user.setHashedPassword(hashed);

        return userRepo.save(user);
    }


    public boolean authenticateUser(String name, String rawPassword) {
        Optional<User> userOpt = userRepo.findByName(name);

        if (userOpt.isEmpty()) {
            return false;  // user not found
        }

        User user = userOpt.get();

        // Check raw password matches hashed password stored in DB
        return passwordEncoder.matches(rawPassword, user.getHashedPassword());
    }
}
