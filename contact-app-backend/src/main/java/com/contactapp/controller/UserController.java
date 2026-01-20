package com.contactapp.controller;

import com.contactapp.dto.UserResponse;
import com.contactapp.dto.UserUpdateRequest;
import com.contactapp.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "APIs for managing user profile")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "Get current authenticated user details")
    public ResponseEntity<UserResponse> getCurrentUser() {
        UserResponse user = userService.getCurrentUser();
        return ResponseEntity.ok(user);
    }
    
    @PutMapping("/me")
    @Operation(summary = "Update user profile", description = "Update current user profile information")
    public ResponseEntity<UserResponse> updateUser(@Valid @RequestBody UserUpdateRequest updateRequest) {
        UserResponse updatedUser = userService.updateUser(updateRequest);
        return ResponseEntity.ok(updatedUser);
    }
}
