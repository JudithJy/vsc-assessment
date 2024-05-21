import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.css'],
})
export class ContactListComponent {
  // Initializing empty contacts array
  contacts: Contact[] = [];

  // Injecting ContactService
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }

  add_contact(contact: Contact) {
    this.contactService.addContact(contact);
  }

  delete_contact(id?: number) {
    if (id) {
      this.contactService.deleteContact(id);
    } else {
      console.error('Error: Cannot delete contact with undefined ID.');
    }
  }

  edit_contact(contact: Contact){
    this.contactService.updateContact(contact);
  }
}
