import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [FormBuilder, HttpClient, ContactService]
})
export class ContactFormComponent {
  contactForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private contactService: ContactService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      telephoneNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['',[Validators.required]]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;
      this.contactService.addContact(contact).subscribe(
        response => {
          Swal.fire('Success', 'Contact added successfully!', 'success');
          this.contactForm.reset();
        },
        (error: HttpErrorResponse) => { // Update error type to HttpErrorResponse
          console.error('Error adding contact:', error);
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            this.errorMessage = 'An error occurred: ' + error.error.message;
          } else {
            // Server-side error
            this.errorMessage = error.error; // Assuming error.error contains the error message
          }
        }
      );
    } else {
      console.error('Form is invalid!');
      this.contactForm.markAllAsTouched();
    }
  }
}
