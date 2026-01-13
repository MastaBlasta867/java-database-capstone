package com.project.back_end.services;

import com.project.back_end.repo.AdminRepository;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.PatientRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class TokenService {

    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;

    public TokenService(AdminRepository adminRepository,
                        DoctorRepository doctorRepository,
                        PatientRepository patientRepository) {
        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    // Generate signing key from secret
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Generate JWT token for a given email
    // Generate JWT token for a given email
public String generateToken(String email) {
    Date now = new Date();
    Date expiry = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days

    return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
}

    // Extract email (subject) from token
    public String extractEmail(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }
    
    // Validate token for a specific role
    public boolean validateToken(String token, String role) {
        try {
            String email = extractEmail(token);

            switch (role.toLowerCase()) {
                case "admin":
                    return adminRepository.findByEmail(email).isPresent();
                case "doctor":
                    return doctorRepository.findByEmail(email).isPresent();
                case "patient":
                    return patientRepository.findByEmail(email).isPresent();
                default:
                    return false;
            }
        } catch (Exception e) {
            return false; // invalid token or parsing error
        }
    }
}
