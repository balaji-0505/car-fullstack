package com.klu.carrental.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.klu.carrental.service.UserService;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:30082") // ✅ frontend NodePort
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ✅ Signup API
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");

        String result = userService.registerUser(username, email, password);

        if (result.contains("exists")) {
            return ResponseEntity.status(409).body(result); // Conflict if already exists
        }
        return ResponseEntity.ok(result);
    }

    // ✅ Login API
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        String result = userService.loginUser(username, password);

        if (result.contains("Invalid")) {
            return ResponseEntity.status(401).body(result); // Unauthorized
        }
        return ResponseEntity.ok(result);
    }
}
