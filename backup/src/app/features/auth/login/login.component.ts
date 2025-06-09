import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Credentials } from '../../../core/services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private tokenStore: TokenStorageService,
    public router: Router
  ) {}
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.controls;

      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      const loginCredentials: Credentials = {
        email: email.value!,
        password: password.value!,
      };
      // console.log(loginCredentials);
      this.authService.login(loginCredentials).subscribe({
        next: (res: any) => {
          debugger;

          this.tokenStore.setToken(res.accessToken, res.user.role, res.user);
          console.log(res.user.role);
          const role = res.user.role;
          if (role === 'Admin') {
            console.log('logiing to admin');
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'User') {
            console.log('logiing to user');
            this.router.navigate(['/user/dashboard']);
          } else if (role === 'Artist') {
            console.log('logiing to user');
            this.router.navigate(['/artist/dashboard']);
          } else {
            this.router.navigate(['/']);
            console.log('logiing tonobnenejnrwkh');
          }
        },
        error: (err) => {
          console.error('Registration failed:', err);
        },
      });
    }
  }
}
