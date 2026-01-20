import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser?: User;
  isLoading = false;
  isEditing = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      about: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        this.profileForm.patchValue(user);
        this.profileForm.disable();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading profile:', error);
        this.errorMessage = 'Failed to load profile';
        this.isLoading = false;
      }
    });
  }

  enableEdit(): void {
    this.isEditing = true;
    this.profileForm.enable();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.profileForm.patchValue(this.currentUser!);
    this.profileForm.disable();
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.userService.updateUser(this.profileForm.value).subscribe({
        next: (user: User) => {
          this.currentUser = user;
          this.isEditing = false;
          this.profileForm.disable();
          this.isLoading = false;
          this.successMessage = 'Profile updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to update profile';
        }
      });
    }
  }
}
