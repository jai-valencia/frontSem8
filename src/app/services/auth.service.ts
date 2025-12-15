import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:8081/api/usuarios'; 
  
  // El Signal guarda un booleano
  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  login(req: LoginRequest): Observable<string> {
    return this.http.post(`${this.API_URL}/login`, req, { responseType: 'text' })
      .pipe(
        tap(token => {
          localStorage.setItem('token', token);
          this.isAuthenticated.set(true); // Actualiza el Signal a true
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false); // Actualiza el Signal a false
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}