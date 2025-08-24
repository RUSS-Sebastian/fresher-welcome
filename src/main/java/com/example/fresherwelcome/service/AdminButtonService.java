package com.example.fresherwelcome.service;

import com.example.fresherwelcome.model.AdminButton;
import com.example.fresherwelcome.repository.AdminButtonRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminButtonService {

    private final AdminButtonRepo repository;

    public AdminButtonService(AdminButtonRepo repository) {
        this.repository = repository;
    }

    // ✅ Get the current status of a button
    @Transactional(readOnly = true)
    public boolean getStatus(String buttonName) {
        return repository.findByButtonName(buttonName)
                .map(AdminButton::getStatus)
                .orElse(false); // default OFF if button doesn't exist
    }

    // ✅ Update (toggle) button status
    @Transactional
    public AdminButton updateStatus(String buttonName, boolean status) {
        AdminButton button = repository.findByButtonName(buttonName)
                .orElse(new AdminButton(buttonName, status));
        button.setStatus(status);
        return repository.save(button);
    }
}
