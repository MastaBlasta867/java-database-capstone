package com.project.back_end.mvc;

import com.project.back_end.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class DashboardController {

    private final TokenService tokenService;

    @Autowired
    public DashboardController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    // Admin dashboard route
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        boolean valid = tokenService.validateToken(token, "admin");
        if (valid) {
            // If token is valid, render admin dashboard template
            return "admin/adminDashboard"; 
        } else {
            // If invalid, redirect to login page
            return "redirect:/login";
        }
    }

    // Doctor dashboard route
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        boolean valid = tokenService.validateToken(token, "doctor");
        if (valid) {
            // If token is valid, render doctor dashboard template
            return "doctor/doctorDashboard"; 
        } else {
            // If invalid, redirect to login page
            return "redirect:/login";
        }
    }
}
