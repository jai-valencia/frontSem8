import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.html'
})
export class UsuariosComponent {
  usuarios = [
    { id: 1, nombre: 'Jaime Valencia', rol: 'Admin' },
    { id: 2, nombre: 'Carlos Pérez', rol: 'User' },
    { id: 3, nombre: 'Ana López', rol: 'Supervisor' }
  ];
}
