
package com.anurag.aiml;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AppUserRepository appUserRepository;
    private final WorkerRepository workerRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            AppUserRepository appUserRepository,
            WorkerRepository workerRepository,
            PasswordEncoder passwordEncoder) {

        this.appUserRepository = appUserRepository;
        this.workerRepository = workerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Registration request
    public static class RegisterRequest {
        public String fullName;
        public String email;
        public String password;
        public String phone;
        public String skills;
        public String location;
        public Integer experienceYears;
    }

    // Login request
    public static class LoginRequest {
        public String email;
        public String password;
    }

    // REGISTER API: POST /api/register
    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        if (request.fullName == null
                || request.fullName.isBlank()
                || request.email == null
                || request.email.isBlank()
                || request.password == null
                || request.password.length() < 8) {

            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            "Name, email, and a password of at least 8 characters are required."));
        }

        String email = request.email.trim().toLowerCase();

        if (appUserRepository.existsByEmail(email)
                || workerRepository.existsByEmail(email)) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("message", "This email is already registered."));
        }

        // Create worker profile
        Worker worker = new Worker();

        worker.setFullName(request.fullName.trim());
        worker.setEmail(email);
        worker.setPhone(request.phone);
        worker.setSkills(request.skills);
        worker.setLocation(request.location);
        worker.setExperienceYears(
                request.experienceYears == null
                        ? 0 : request.experienceYears);
        worker.setAvailability(true);
        worker.setRating(BigDecimal.ZERO);

        workerRepository.save(worker);

        // Create login account
        AppUser user = new AppUser();

        user.setEmail(email);
        user.setPasswordHash(
                passwordEncoder.encode(request.password));
        user.setRole("WORKER");

        appUserRepository.save(user);

        Map<String, String> result = new HashMap<>();
        result.put("message", "Account created successfully.");
        result.put("email", email);
        result.put("role", "WORKER");

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // LOGIN API: POST /api/login
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        if (request.email == null
                || request.email.isBlank()
                || request.password == null
                || request.password.isBlank()) {

            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            "Email and password are required."));
        }

        String email = request.email.trim().toLowerCase();

        return appUserRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(
                        request.password,
                        user.getPasswordHash()))
                .<ResponseEntity<?>>map(user -> {

                    Map<String, String> result = new HashMap<>();
                    result.put("message", "Login successful.");
                    result.put("email", user.getEmail());
                    result.put("role", user.getRole());

                    return ResponseEntity.ok(result);
                })
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("message",
                                        "Invalid email or password.")));
    }
}
