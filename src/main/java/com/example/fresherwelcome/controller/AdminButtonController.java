package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.model.AdminButton;
import com.example.fresherwelcome.service.AdminButtonService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin-buttons")
public class AdminButtonController {

    private final AdminButtonService service;

    public AdminButtonController(AdminButtonService service) {
        this.service = service;
    }

    // ✅ Get button status
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{buttonName}")
    public ResponseEntity<Boolean> getButtonStatus(@PathVariable String buttonName) {
        boolean status = service.getStatus(buttonName);
        return ResponseEntity.ok(status);
    }

    // ✅ Update button status
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{buttonName}")
    public ResponseEntity<AdminButton> updateButtonStatus(
            @PathVariable String buttonName,
            @RequestParam boolean status
    ) {
        AdminButton updatedButton = service.updateStatus(buttonName, status);
        return ResponseEntity.ok(updatedButton);
    }
}
