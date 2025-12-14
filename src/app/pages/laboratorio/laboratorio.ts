import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, CommonModule],
  templateUrl: './laboratorio.html'
  
})
export class LaboratorioComponent {
  labs = [
    { id: 1, nombre: 'Lab Central', estado: 'Operativo' },
    { id: 2, nombre: 'Lab Norte', estado: 'Mantenimiento' }
  ];
}
