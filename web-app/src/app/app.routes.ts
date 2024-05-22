import { Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'contacts', component: ContactListComponent },
    { path: 'contacts/add_contact', component: ContactFormComponent },
    { path: 'contacts/edit_contact/:id', component: ContactFormComponent },
];
