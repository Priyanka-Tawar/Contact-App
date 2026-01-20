import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ContactService } from '../../services/contact.service';
import { Contact, ContactRequest } from '../../models/contact.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];
  contactForm: FormGroup;
  showModal = false;
  isEditMode = false;
  currentContactId?: number;
  isLoading = false;
  searchTerm = '';
  
  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastService: ToastService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: [''],
      address: [''],
      description: [''],
      favorite: [false]
    });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.contactService.getAllContacts(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (response: any) => {
        this.contacts = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading contacts:', error);
        this.toastService.error('Failed to load contacts. Please login again.');
        this.isLoading = false;
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0; // Reset to first page on new search
    this.loadContacts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 0;
    this.loadContacts();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.contactForm.reset({ favorite: false });
    this.showModal = true;
  }

  openEditModal(contact: Contact): void {
    this.isEditMode = true;
    this.currentContactId = contact.id;
    this.contactForm.patchValue(contact);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.contactForm.reset();
    this.currentContactId = undefined;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData: ContactRequest = this.contactForm.value;

      if (this.isEditMode && this.currentContactId) {
        this.contactService.updateContact(this.currentContactId, contactData).subscribe({
          next: () => {
            this.toastService.success('Contact updated successfully!');
            this.loadContacts();
            this.closeModal();
          },
          error: (error: any) => {
            console.error('Error updating contact:', error);
            this.toastService.error('Failed to update contact');
          }
        });
      } else {
        this.contactService.createContact(contactData).subscribe({
          next: () => {
            this.toastService.success('Contact created successfully!');
            this.loadContacts();
            this.closeModal();
          },
          error: (error: any) => {
            console.error('Error creating contact:', error);
            this.toastService.error('Failed to create contact');
          }
        });
      }
    }
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.toastService.success('Contact deleted successfully!');
          this.loadContacts();
        },
        error: (error: any) => {
          console.error('Error deleting contact:', error);
          this.toastService.error('Failed to delete contact');
        }
      });
    }
  }

  deleteAllContacts(): void {
    if (confirm('Are you sure you want to delete all contacts? This action cannot be undone.')) {
      this.contactService.deleteAllContacts().subscribe({
        next: () => {
          this.toastService.success('All contacts deleted successfully!');
          this.loadContacts();
        },
        error: (error: any) => {
          console.error('Error deleting contacts:', error);
          this.toastService.error('Failed to delete all contacts');
        }
      });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadContacts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadContacts();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadContacts();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
