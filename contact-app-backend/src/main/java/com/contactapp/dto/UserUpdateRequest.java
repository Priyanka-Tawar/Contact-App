package com.contactapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;
    
    @Email(message = "Email should be valid")
    @Size(max = 100)
    private String email;
    
    @Size(max = 15)
    private String phone;
    
    @Size(max = 255)
    private String address;
    
    @Size(max = 500)
    private String about;
    
    private String profilePic;
}
