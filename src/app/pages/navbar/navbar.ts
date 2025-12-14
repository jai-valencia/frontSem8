import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {

  constructor(private auth: AuthService, private router: Router) {}

  get loggedUser() {
    return this.auth.isLoggedIn() ? 'Usuario' : null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
