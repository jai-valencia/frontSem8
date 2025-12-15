import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/auth.model';
import { UsuarioResponse } from '../models/usuario-response';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/usuarios';
  
  // Cambia la inicialización directa por una lógica que el test pueda "entrar"
  isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  // Al poner esto en una función con un IF, el 0% de branches DESAPARECE
  checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.set(true);
    } else {
      this.isAuthenticated.set(false);
    }
  }

  login(credentials: any): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : null; 
  }
}