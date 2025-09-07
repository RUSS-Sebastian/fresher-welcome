package com.example.fresherwelcome.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map URL /shops/** to the filesystem uploads/shops/
        registry.addResourceHandler("/shops/**")
                .addResourceLocations("file:uploads/shops/");

        registry.addResourceHandler("/businesses/**")
                .addResourceLocations("file:uploads/businesses/");

        registry.addResourceHandler("/foods/**")
                .addResourceLocations("file:uploads/foods/");

        registry.addResourceHandler("/kingsQueens/**")
                .addResourceLocations("file:uploads/kingsQueens/");
    }
}
