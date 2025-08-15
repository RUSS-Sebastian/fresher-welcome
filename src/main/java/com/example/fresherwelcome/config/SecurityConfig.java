package com.example.fresherwelcome.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/csrf-token") // allow CSRF token fetch
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/login", "/api/users/register", "/csrf-token",
                                "/css/**", "/js/**", "/images/**", "/Page/**")
                            .permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/feedback")
                            .authenticated() // require login for feedback POST
                        .requestMatchers("/protected/**","/api/users/me")
                            .authenticated()
                        .anyRequest()
                            .permitAll()
                );

        return http.build();
    }

}
