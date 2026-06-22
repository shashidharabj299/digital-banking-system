package com.shashi.auth_service.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.shashi.auth_service.dto.LoginRequest;
import com.shashi.auth_service.dto.RegisterRequest;
import com.shashi.auth_service.entity.User;
import com.shashi.auth_service.repository.UserRepository;
import com.shashi.auth_service.util.JwtUtil;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(RegisterRequest request) {
        if (repository.existsByUsername(request.getUsername())) {
            return "Username already taken";
        }
        if (repository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        repository.save(user);
        return "User registered successfully";
    }

    public String login(LoginRequest request) {
        User user = repository.findByUsername(request.getUsername())
            .orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid credentials";
        }

        return JwtUtil.generateToken(user.getUsername());
    }
}