import { Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    { path: 'contacts', component: ContactListComponent },
    { path: 'contacts/add_contact', component: ContactFormComponent },
];
