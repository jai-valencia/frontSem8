export interface CrearOrdenDTO {
  rutPaciente: string; // Nota: Cambié idPaciente por rutPaciente para que coincida con tu DTO de Java
  medicoSolicitante: string;
  observaciones: string;
}

export interface AsignarAnalisisDTO {
  idOrden: number;
  idTipoAnalisis: number;
}

export interface OrdenAnalisis {
  idOrdenAnalisis: number;
  fechaSolicitud?: string;
  estado?: string;
  medicoSolicitante: string;
  observaciones: string;
  paciente?: any; 
}

export interface TipoAnalisis {
  idTipoAnalisis: number;
  nombre: string;
  codigo: string;
  rangoReferencia?: string;
}

export interface ActualizarOrdenDTO {
  medicoSolicitante: string;
  observaciones: string;
}

export interface LoginRequest {
  email: string; 
  password: string;
}