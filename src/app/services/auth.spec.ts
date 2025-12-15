import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UsuarioResponse } from '../models/usuario-response';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no existan peticiones colgadas
  });

  it('debería realizar login exitoso y retornar UsuarioResponse', () => {
    const mockUser: UsuarioResponse = {
      id: 1,
      nombres: 'Jaime',
      apellidos: 'Valencia',
      email: 'jvalencia@test.com',
      roles: ['ADMIN'],
      estado: 'ACTIVO',
      rut: '12345678-9',
      telefono: '99999999'
    };

    // Estamos enviando 1 argumento (un objeto), lo cual coincide con credentials: any
    service.login({ email: 'jvalencia@test.com', password: 'password123' }).subscribe(response => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('debería manejar error 401 de credenciales inválidas', () => {
    service.login({ email: 'mal@test.com', password: '123' }).subscribe({
      next: () => fail('Debería haber fallado'),
      error: (error) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    req.flush('Credenciales inválidas', { status: 401, statusText: 'Unauthorized' });
  });
});