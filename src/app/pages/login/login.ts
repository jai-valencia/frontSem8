import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Verifica que la ruta sea correcta
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login({ email: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/listado']);
      },
      error: (err: any) => {
        this.errorMessage = 'Credenciales inválidas o error de conexión'; // <--- Usar el nuevo nombre
        console.error(err);
      }
    });
  }
}