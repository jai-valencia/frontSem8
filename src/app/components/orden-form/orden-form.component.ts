import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LaboratorioService } from '../../services/laboratorio.service';
import { TipoAnalisis, CrearOrdenDTO, ActualizarOrdenDTO, OrdenAnalisis } from '../../models/laboratorio.model';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'; // Importaciones necesarias

@Component({
  selector: 'app-orden-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orden-form.component.html'
})
export class OrdenFormComponent implements OnInit {
  ordenForm: FormGroup;
  tiposAnalisis: TipoAnalisis[] = []; 
  analisisSeleccionados: TipoAnalisis[] = []; 
  mensaje: string = '';
  isEditMode: boolean = false;
  ordenId: number | null = null;

  // CORRECCIÓN: Inyectar ActivatedRoute y Router en el constructor
  constructor(
    private fb: FormBuilder, 
    private labService: LaboratorioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ordenForm = this.fb.group({
      rutPaciente: ['', [Validators.required]],
      medicoSolicitante: ['', [Validators.required]],
      observaciones: [''],
      tipoAnalisisActual: [''] 
    });
  }

  ngOnInit() {
    this.labService.listarTiposAnalisis().subscribe(data => this.tiposAnalisis = data);
    
    // Obtener ID de la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.ordenId = Number(idParam);
      this.isEditMode = true;
      this.cargarDatosOrden(this.ordenId);
    }
  }

  cargarDatosOrden(id: number) {
    this.labService.obtenerOrdenPorId(id).subscribe({
      next: (orden) => {
        this.ordenForm.patchValue({
          rutPaciente: orden.paciente?.rut || '', // El RUT suele venir anidado en el objeto paciente
          medicoSolicitante: orden.medicoSolicitante,
          observaciones: orden.observaciones
        });
        // Bloquear el RUT en modo edición para evitar inconsistencias
        this.ordenForm.get('rutPaciente')?.disable();
      },
      error: () => this.mensaje = 'Error al cargar la orden'
    });
  }

  agregarAnalisisALista() {
    const id = this.ordenForm.get('tipoAnalisisActual')?.value;
    const analisis = this.tiposAnalisis.find(t => t.idTipoAnalisis == id);
    if (analisis && !this.analisisSeleccionados.find(a => a.idTipoAnalisis === analisis.idTipoAnalisis)) {
      this.analisisSeleccionados.push(analisis);
    }
  }

  quitarAnalisis(index: number) {
    this.analisisSeleccionados.splice(index, 1);
  }

  guardarTodo() {
    if (this.ordenForm.invalid) return;

    if (this.isEditMode && this.ordenId) {
      // LÓGICA DE ACTUALIZACIÓN
      const dto: ActualizarOrdenDTO = {
        medicoSolicitante: this.ordenForm.get('medicoSolicitante')?.value,
        observaciones: this.ordenForm.get('observaciones')?.value
      };

      this.labService.actualizarOrden(this.ordenId, dto).subscribe({
        next: () => {
          this.mensaje = 'Orden actualizada con éxito';
          setTimeout(() => this.router.navigate(['/listado']), 2000);
        },
        error: (err) => this.mensaje = 'Error al actualizar'
      });

    } else {
      // LÓGICA DE CREACIÓN (Solo si hay análisis seleccionados)
      if (this.analisisSeleccionados.length === 0) {
        this.mensaje = 'Debe agregar al menos un examen';
        return;
      }

      const nuevaOrden: CrearOrdenDTO = this.ordenForm.value;
      this.labService.crearOrden(nuevaOrden).subscribe(ordenGuardada => {
        const peticiones = this.analisisSeleccionados.map(a => 
          this.labService.asignarAnalisis({
            idOrden: ordenGuardada.idOrdenAnalisis,
            idTipoAnalisis: a.idTipoAnalisis
          })
        );

        forkJoin(peticiones).subscribe(() => {
          this.mensaje = `Orden #${ordenGuardada.idOrdenAnalisis} creada con éxito.`;
          this.analisisSeleccionados = [];
          this.ordenForm.reset();
        });
      });
    }
  }
}