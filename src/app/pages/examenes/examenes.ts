import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, CommonModule],
  templateUrl: './examenes.html'
})
export class ExamenesComponent {
  examenes = [
    { id: 101, tipo: 'Drogas', resultado: 'Negativo' },
    { id: 102, tipo: 'Alcohol', resultado: 'Positivo' }
  ];
}
