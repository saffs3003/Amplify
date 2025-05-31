import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ROLE = 'role';

  public setToken(token: string, user_info: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ROLE, user_info);
  }
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  public clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE);
  }
  public getRole() {
    return localStorage.getItem(this.USER_ROLE);
  }
}
