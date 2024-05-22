import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http'; 
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
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
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  errorMessage: string | null = null;
  isEditing: boolean = false;
  contactId: number | null = null;

  constructor(
    private contactService: ContactService, 
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      telephoneNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.contactId = +id; // Convert string to number
        this.isEditing = true;
        this.getContactDetails(this.contactId);
      }
    });
  }

  getContactDetails(contactId: number) {
    this.contactService.getContactById(contactId).subscribe(
      (contact: Contact) => {
        this.contactForm.patchValue(contact);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching contact details:', error);
        this.errorMessage = error.error;
      }
    );
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;
      if (this.isEditing && this.contactId) {
        contact.id = this.contactId; // Set contact ID for editing
        this.editContact(contact);
      } else {
        this.addContact(contact);
      }
    } else {
      console.error('Form is invalid!');
      this.contactForm.markAllAsTouched();
    }
  }

  addContact(contact: Contact) {
    this.contactService.addContact(contact).subscribe(
      () => {
        Swal.fire('Success', 'Contact added successfully!', 'success');
        this.contactForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding contact:', error);
        this.errorMessage = error.error;
      }
    );
  }

  editContact(contact: Contact) {
    this.contactService.editContact(contact).subscribe(
      () => {
        Swal.fire('Success', 'Contact edited successfully!', 'success');
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating contact:', error);
        this.errorMessage = error.error;
      }
    );
  }
}
