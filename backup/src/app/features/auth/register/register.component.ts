import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Credentials } from '../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';

export interface RegisterUser {
  email: string;
  password: string;
  name: string;
  gender: string;
  role: string;
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private tokenStore: TokenStorageService,
    private router: Router
  ) {}
  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    role: new FormControl('', [Validators.required]),
  });

  public onRegister() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const name = this.registerForm.get('name')?.value;
    const gender = this.registerForm.get('gender')?.value;
    const role = this.registerForm.get('role')?.value;

    if (!email || !password || !name || !role || !gender) {
      throw new Error('Email, password, name and role are required');
    }

    const registerCredentials: RegisterUser = {
      email,
      password,
      name,
      gender,
      role,
    };

    this.authService.register(registerCredentials).subscribe({
      next: (res) => {
        debugger;
        console.log(
          `this is res ${res.accessToken} :${res.user} role :${res.user.role}just this`
        );

        this.tokenStore.setToken(res.accessToken, res.user.role);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      },
    });
  }
}
