import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2'; // Import SweetAlertResult

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

  delete_contact(contactOrId: Contact | number) {
    let id: number | undefined;
    if (typeof contactOrId === 'number') {
      id = contactOrId;
    } else if (contactOrId) {
      id = contactOrId.id;
    }
  
    if (id !== undefined) {
      Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this contact!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result: SweetAlertResult<any>) => {
        if (result.value) {
          this.contactService.deleteContact(id).subscribe(
            () => {
              this.getContacts();
              Swal.fire("Deleted!", "The contact has been deleted.", "success");
            },
            (error) => {
              if (error.status === 200 && error.error.text === "Contact deleted successfully") {
                this.getContacts();
                Swal.fire("Deleted!", "The contact has been deleted.", "success");
              } else {
                console.error('Error deleting contact:', error);
                Swal.fire("Error", "Failed to delete the contact.", "error");
              }
            }
          );
        } else {
          Swal.fire("Cancelled", "The contact is safe!", "error");
        }
      });
    } else {
      console.error('Error: Cannot delete contact with undefined ID.');
    }
  }  

  edit_contact(contact: Contact){
    this.router.navigate(['/contacts/edit_contact', contact.id]);
  }

  add_contacts() {
    this.router.navigate(['/contacts/add_contact']);
  }
}
