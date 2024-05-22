import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ContactService],
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.css'],
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

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

  add_contacts() {
    this.router.navigate(['/contacts/add_contact']);
  }
}
