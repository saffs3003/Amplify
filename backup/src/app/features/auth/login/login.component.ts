import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Credentials } from '../../../core/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (!email || !password) {
      // Handle error, maybe show message or stop submit
      throw new Error('Email and password are required');
    }
    const loginCredentials: Credentials = { email, password };
    console.log(loginCredentials);
    this.authService.login(loginCredentials).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
    });
  }
}
