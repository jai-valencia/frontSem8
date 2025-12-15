export interface UsuarioResponse {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  rut: string;
  telefono: string;
  roles: string[];
  estado: string;
  fechaCreacion?: string;
}