import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  imports: [ReactiveFormsModule],
  providers: [FormBuilder,HttpClient] 
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private contactService: ContactService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      telephoneNumber: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('')
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Access form values using contactForm.value
      const contact: Contact = this.contactForm.value;
      this.contactService.addContact(contact)
        .subscribe(response => {
          // Handle successful addition
          console.log('Contact added successfully!');
          // Reset form after successful submission
          this.contactForm.reset(); 
        }, error => {
          console.error('Error adding contact:', error);
        });
    } else {
      console.error('Form is invalid!');
    }
  }
}
