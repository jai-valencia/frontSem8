import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/auth.model';
import { UsuarioResponse } from '../models/usuario-response';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:8081/api/usuarios'; 
  public apiUrl = 'http://localhost:8081/api/usuarios';
  
  // El Signal guarda un booleano
  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false); // Actualiza el Signal a false
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
}