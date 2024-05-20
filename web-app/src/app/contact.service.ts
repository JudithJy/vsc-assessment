import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../app/models/contact.model'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = process.env.API_URL;
  }

  // Method to get all contacts
  get_contacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.api_url}/contacts`);
  }

  // Method to add a new contact
  add_contact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.api_url}/contacts`, contact);
  }

  // Method to update an existing contact
  update_contact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.api_url}/contacts/${contact.id}`, contact);
  }

  // Method to delete a contact by ID
  delete_contact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api_url}/contacts/${id}`);
  }
}
