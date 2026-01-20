package com.contactapp.service;

import com.contactapp.dto.ContactRequest;
import com.contactapp.dto.ContactResponse;
import com.contactapp.model.Contact;
import com.contactapp.model.User;
import com.contactapp.repository.ContactRepository;
import com.contactapp.repository.UserRepository;
import com.contactapp.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactService {
    
    @Autowired
    private ContactRepository contactRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public ContactResponse createContact(ContactRequest contactRequest) {
        User user = getCurrentUser();
        
        Contact contact = new Contact();
        contact.setName(contactRequest.getName());
        contact.setEmail(contactRequest.getEmail());
        contact.setPhone(contactRequest.getPhone());
        contact.setAddress(contactRequest.getAddress());
        contact.setDescription(contactRequest.getDescription());
        contact.setProfilePic(contactRequest.getProfilePic());
        contact.setFavorite(contactRequest.getFavorite() != null ? contactRequest.getFavorite() : false);
        contact.setUser(user);
        
        Contact savedContact = contactRepository.save(contact);
        return mapToContactResponse(savedContact);
    }
    
    public Page<ContactResponse> getAllContacts(int page, int size, String sortBy, String search) {
        User user = getCurrentUser();
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<Contact> contacts;
        
        if (search != null && !search.trim().isEmpty()) {
            contacts = contactRepository.findByUserIdAndNameContainingIgnoreCaseOrUserIdAndEmailContainingIgnoreCaseOrUserIdAndPhoneContaining(
                    user.getId(), search, user.getId(), search, user.getId(), search, pageable);
        } else {
            contacts = contactRepository.findByUserId(user.getId(), pageable);
        }
        
        return contacts.map(this::mapToContactResponse);
    }
    
    public ContactResponse getContactById(Long id) {
        User user = getCurrentUser();
        
        Contact contact = contactRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        
        return mapToContactResponse(contact);
    }
    
    public ContactResponse updateContact(Long id, ContactRequest contactRequest) {
        User user = getCurrentUser();
        
        Contact contact = contactRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        
        contact.setName(contactRequest.getName());
        contact.setEmail(contactRequest.getEmail());
        contact.setPhone(contactRequest.getPhone());
        contact.setAddress(contactRequest.getAddress());
        contact.setDescription(contactRequest.getDescription());
        contact.setProfilePic(contactRequest.getProfilePic());
        if (contactRequest.getFavorite() != null) {
            contact.setFavorite(contactRequest.getFavorite());
        }
        
        Contact updatedContact = contactRepository.save(contact);
        return mapToContactResponse(updatedContact);
    }
    
    @Transactional
    public void deleteContact(Long id) {
        User user = getCurrentUser();
        
        Contact contact = contactRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        
        contactRepository.delete(contact);
    }
    
    @Transactional
    public void deleteAllContacts() {
        User user = getCurrentUser();
        List<Contact> contacts = contactRepository.findByUserId(user.getId());
        contactRepository.deleteAll(contacts);
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    private ContactResponse mapToContactResponse(Contact contact) {
        ContactResponse response = new ContactResponse();
        response.setId(contact.getId());
        response.setName(contact.getName());
        response.setEmail(contact.getEmail());
        response.setPhone(contact.getPhone());
        response.setAddress(contact.getAddress());
        response.setDescription(contact.getDescription());
        response.setProfilePic(contact.getProfilePic());
        response.setFavorite(contact.getFavorite());
        response.setCreatedAt(contact.getCreatedAt());
        response.setUpdatedAt(contact.getUpdatedAt());
        return response;
    }
}
