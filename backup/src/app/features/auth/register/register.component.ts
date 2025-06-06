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

  public NextStepTrack: number = 1;
  animateStep = true;
  private role: string = '';
  public roles = [
    {
      name: 'Artist',
      img: '../../../../assets/images/billie-eilish-tout.jpg',
    },
    {
      name: 'User',
      img: '../../../../assets/images/listening.jpg',
    },
  ];

  public preferedGenre = [
    { id: 1, name: 'Indie' },
    { id: 2, name: 'PunkRock' },
    { id: 3, name: 'Hip-Pop' },
    { id: 4, name: 'Jazz' },
    { id: 5, name: 'Classical' },
  ];
  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
  });
  public setRole(selectedRole: string): void {
    this.role = selectedRole;
    if (this.NextStepTrack >= 1 && this.NextStepTrack < 3) {
      this.NextStepTrack = this.NextStepTrack + 1;
    } else {
      this.NextStepTrack = 1;
    }
  }
  public onRegister() {
    if (!this.registerForm.valid) {
      throw new Error('Email, password, name and role are required');
      return;
    } else {
      const { email, password, name, gender } = this.registerForm.controls;

      const registerCredentials: RegisterUser = {
        email: email.value!,
        password: password.value!,
        name: name.value!,
        gender: gender.value!,
        role: this.role,
      };

      this.authService.register(registerCredentials).subscribe({
        next: (res) => {
          debugger;
          console.log(
            `this is res ${res.accessToken} :${res.user.role} role :${res.user}just this`
          );

          this.tokenStore.setToken(res.accessToken, res.user.role);

          if (res.user.role == 'Admin') {
            console.log('admin nav');
            this.router.navigate(['/']);
          } else if (res.user.role == 'User') {
            console.log('user nav');
            this.router.navigate(['/user/dashboard']);
          }
        },
        error: (err) => {
          console.error('Registration failed:', err);
        },
      });
    }
  }

  public nextStep() {}
  public prevStep() {
    if (this.NextStepTrack > 1 && this.NextStepTrack < 2) {
      this.NextStepTrack = this.NextStepTrack - 1;
    } else {
      this.NextStepTrack = 1;
    }
  }
}
