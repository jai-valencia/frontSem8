import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'] // Asegúrate de que este archivo exista o bórralo si no lo usas
})
export class Navbar {

  // Un solo constructor con el servicio público para acceder al Signal desde el HTML
  constructor(public authService: AuthService, private router: Router) {}

  // Getter para mostrar el nombre si está autenticado
  get loggedUser() {
    // Usamos el signal con paréntesis ()
    return this.authService.isAuthenticated() ? 'Usuario Conectado' : null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}