package com.contactapp.repository;

import com.contactapp.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    Page<Contact> findByUserId(Long userId, Pageable pageable);
    Optional<Contact> findByIdAndUserId(Long id, Long userId);
    List<Contact> findByUserId(Long userId);
    void deleteByIdAndUserId(Long id, Long userId);
    
    Page<Contact> findByUserIdAndNameContainingIgnoreCaseOrUserIdAndEmailContainingIgnoreCaseOrUserIdAndPhoneContaining(
            Long userId1, String name, Long userId2, String email, Long userId3, String phone, Pageable pageable);
}
