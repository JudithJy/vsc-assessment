import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http'; 
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [FormBuilder, HttpClient, ContactService]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('onSubmit');
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      this.contactService.userLogin(user).subscribe(
        () => {
          this.router.navigate(['/contacts']);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
        }
      );
    }
  }
}
