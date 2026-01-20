package com.contactapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String description;
    private String profilePic;
    private Boolean favorite;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
