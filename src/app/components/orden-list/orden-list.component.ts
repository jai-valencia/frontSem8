import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratorioService } from '../../services/laboratorio.service';
import { OrdenAnalisis } from '../../models/laboratorio.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orden-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: 'orden-list.component.html'
})
export class OrdenListComponent implements OnInit {
  ordenes: OrdenAnalisis[] = [];
  filtroRut: string = '';

  constructor(private labService: LaboratorioService) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.labService.listarOrdenes().subscribe(data => this.ordenes = data);
  }

  buscarPorRut(): void {
    this.labService.listarOrdenes(undefined, this.filtroRut).subscribe(data => this.ordenes = data);
  }

  borrarOrden(id: number): void {
    if(confirm('¿Está seguro de eliminar esta orden?')) {
      this.labService.eliminarOrden(id).subscribe(() => this.cargarOrdenes());
    }
  }
}