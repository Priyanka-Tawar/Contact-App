package com.contactapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequest {
    
    @NotBlank(message = "Name is required")
    @Size(max = 50, message = "Name must not exceed 50 characters")
    private String name;
    
    @Email(message = "Email should be valid")
    @Size(max = 100)
    private String email;
    
    @Size(max = 15, message = "Phone must not exceed 15 characters")
    private String phone;
    
    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;
    
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    private String profilePic;
    private Boolean favorite;
}
