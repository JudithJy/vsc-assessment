import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../app/models/contact.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5159/api';

  constructor(private http: HttpClient) {}

  userLogin(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, user);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts/get_contacts`);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/contacts/get_contact/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contacts/create_contact`, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/contacts/update_contact/${contact.id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contacts/delete_contact/${id}`);
  }
  
  editContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/contacts/update_contact/${contact.id}`, contact);
  }
}
