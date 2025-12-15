import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { 
  CrearOrdenDTO, 
  AsignarAnalisisDTO, 
  OrdenAnalisis, 
  TipoAnalisis, 
  ActualizarOrdenDTO 
} from '../models/laboratorio.model';

@Injectable({ providedIn: 'root' })
export class LaboratorioService {
  private API_URL = 'http://localhost:8080/api/labs';

  constructor(private http: HttpClient) {}

  listarTiposAnalisis(): Observable<TipoAnalisis[]> {
    return this.http.get<TipoAnalisis[]>(`${this.API_URL}/tipos-analisis`)
      .pipe(catchError(this.handleError));
  }

  crearOrden(dto: CrearOrdenDTO): Observable<OrdenAnalisis> {
    return this.http.post<OrdenAnalisis>(`${this.API_URL}/ordenes`, dto)
      .pipe(catchError(this.handleError));
  }

  asignarAnalisis(dto: AsignarAnalisisDTO): Observable<any> {
    return this.http.post(`${this.API_URL}/asignaciones`, dto)
      .pipe(catchError(this.handleError));
  }

  listarOrdenes(estado?: string, rut?: string): Observable<OrdenAnalisis[]> {
    let params: any = {};
    if (estado) params.estado = estado;
    if (rut) params.rutPaciente = rut;

    return this.http.get<OrdenAnalisis[]>(`${this.API_URL}/ordenes`, { params })
      .pipe(catchError(this.handleError));
  }

  eliminarOrden(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/ordenes/${id}`)
      .pipe(catchError(this.handleError));
  }

  obtenerOrdenPorId(id: number): Observable<OrdenAnalisis> {
    return this.http.get<OrdenAnalisis>(`${this.API_URL}/ordenes/${id}`)
      .pipe(catchError(this.handleError));
  }
    
  actualizarOrden(id: number, dto: ActualizarOrdenDTO): Observable<OrdenAnalisis> {
    return this.http.put<OrdenAnalisis>(`${this.API_URL}/ordenes/${id}`, dto)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let mensaje = 'Ocurrió un error inesperado';
    if (error.status === 404) mensaje = 'Recurso no encontrado';
    if (error.status === 400) mensaje = 'Datos inválidos';
    return throwError(() => new Error(mensaje));
  }
}