package com.example.fresherwelcome.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class LogoutController {

    @PostMapping("/logout")
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) throws IOException {

        if (authentication != null) {
            // Invalidate session and clear authentication
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }

        // Send JSON response (optional) instead of redirect
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"message\": \"Logged out successfully\"}");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
