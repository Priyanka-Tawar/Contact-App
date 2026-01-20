package com.contactapp.controller;

import com.contactapp.dto.ContactRequest;
import com.contactapp.dto.ContactResponse;
import com.contactapp.dto.MessageResponse;
import com.contactapp.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/contacts")
@Tag(name = "Contact Management", description = "APIs for managing contacts")
@SecurityRequirement(name = "bearerAuth")
public class ContactController {
    
    @Autowired
    private ContactService contactService;
    
    @PostMapping
    @Operation(summary = "Create contact", description = "Add a new contact")
    public ResponseEntity<ContactResponse> createContact(@Valid @RequestBody ContactRequest contactRequest) {
        ContactResponse contact = contactService.createContact(contactRequest);
        return ResponseEntity.ok(contact);
    }
    
    @GetMapping
    @Operation(summary = "Get all contacts", description = "Get paginated list of all contacts")
    public ResponseEntity<Page<ContactResponse>> getAllContacts(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Search keyword") @RequestParam(required = false) String search) {
        Page<ContactResponse> contacts = contactService.getAllContacts(page, size, sortBy, search);
        return ResponseEntity.ok(contacts);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get contact by ID", description = "Get a specific contact by ID")
    public ResponseEntity<ContactResponse> getContactById(@PathVariable Long id) {
        ContactResponse contact = contactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update contact", description = "Update an existing contact")
    public ResponseEntity<ContactResponse> updateContact(
            @PathVariable Long id,
            @Valid @RequestBody ContactRequest contactRequest) {
        ContactResponse updatedContact = contactService.updateContact(id, contactRequest);
        return ResponseEntity.ok(updatedContact);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete contact", description = "Delete a specific contact")
    public ResponseEntity<MessageResponse> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok(new MessageResponse("Contact deleted successfully"));
    }
    
    @DeleteMapping
    @Operation(summary = "Delete all contacts", description = "Delete all contacts of the current user")
    public ResponseEntity<MessageResponse> deleteAllContacts() {
        contactService.deleteAllContacts();
        return ResponseEntity.ok(new MessageResponse("All contacts deleted successfully"));
    }
}
