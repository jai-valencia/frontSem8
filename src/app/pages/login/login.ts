import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    const ok = this.auth.login(this.username, this.password);

    if (!ok) {
      this.errorMessage = 'Usuario o contraseña incorrectos';
      return;
    }

    this.router.navigate(['/usuarios']);
  }
}