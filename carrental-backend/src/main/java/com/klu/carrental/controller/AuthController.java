package com.klu.carrental.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.klu.carrental.service.UserService;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:30082")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ✅ Signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> request) {
        try {
            String msg = userService.registerUser(
                request.get("username"),
                request.get("email"),
                request.get("password")
            );
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ Login endpoint (returns JWT)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request) {
        try {
            String token = userService.loginUser(
                request.get("username"),
                request.get("password")
            );
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}
