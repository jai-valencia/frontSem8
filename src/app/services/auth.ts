import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'app_token';
  private platformId = inject(PLATFORM_ID);

  constructor() {}

  login(username: string, password: string): boolean {

    // 🔥 Login simulado (cuando conectemos al microservicio lo cambiamos)
    if (username === 'admin' && password === '1234') {

      const fakeJwt =
        'eyFakeJwtToken_123456.ABCDEF.GHIJK'; // Token falso

      // Solo accede a localStorage en el navegador
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.tokenKey, fakeJwt);
      }
      return true;
    }

    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false; // En el servidor, siempre retorna false
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null; // En el servidor, no hay token
  }
}