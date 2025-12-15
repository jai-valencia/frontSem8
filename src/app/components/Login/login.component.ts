import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Usaremos solo esta para los mensajes de error

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // ESTE ES EL MÉTODO ÚNICO QUE SOLUCIONA EL ERROR
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Tomamos el valor del formulario (que ya es un objeto {email, password})
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (res) => {
          console.log('Login exitoso', res);
          this.router.navigate(['/dashboard']); // Ajusta a tu ruta (dashboard o listado)
        },
        error: (err) => {
          console.error('Error en login', err);
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      });
    }
  }
}