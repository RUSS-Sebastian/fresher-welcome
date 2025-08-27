package com.example.fresherwelcome.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CSRF
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/csrf-token","api/users/register") // allow CSRF token fetch
                )

                // Authorization
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers(
                                "/api/users/login",
                                "/api/users/register",
                                "/csrf-token",
                                "/css/**", "/js/**", "/images/**", "/Page/**"
                        ).permitAll()

                        // Feedback requires login (any role)
                        .requestMatchers(HttpMethod.POST, "/api/feedback").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/event").hasRole("ADMIN")
                        .requestMatchers("/api/event/all","/api/event/{id}","/api/admin-buttons/{buttonName}","/api/volunteers/pending")
                            .authenticated()

                        .requestMatchers("/api/volunteers/{id}/status","/api/volunteers/approved").authenticated()

                        .requestMatchers(HttpMethod.POST,"/api/volunteers").hasAnyRole("ADMIN","STUDENT")

                        // Logout requires login
                        .requestMatchers(HttpMethod.POST,"/logout").authenticated()


                        .requestMatchers(HttpMethod.POST,"/api/messages").hasRole("ADMIN")

                        .requestMatchers("/api/feedback/**").authenticated()

                        // Admin-only pages: only ADMIN can access /admin/**
                        .requestMatchers("/admin/**").hasRole("ADMIN")

                        // Pages accessible by both ADMIN and STUDENT
                        .requestMatchers("/protected/**", "/api/users/me","/api/messages/user/{userId}","/api/messages/count/{userId}","/api/messages/read")
                            .hasAnyRole("ADMIN", "STUDENT")

                        // Everything else
                        .anyRequest().permitAll()
                )

                // Disable Spring Security’s default logout handling (we use custom controller)
                .logout(logout -> logout.disable());

        return http.build();
    }
}

