import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService Branches', () => {
  let httpMock: HttpTestingController;

  // TEST 1: Forzamos la rama donde el token SÍ existe al iniciar
  it('debería inicializar isAuthenticated en true si hay token previo', () => {
    localStorage.setItem('token', 'fake-token');
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    
    const service = TestBed.inject(AuthService);
    expect(service.isAuthenticated()).toBeTrue();
    localStorage.clear();
  });

  // TEST 2: Forzamos la rama donde el token NO existe y probamos el resto
  it('debería manejar el flujo completo de autenticación y errores', () => {
    localStorage.clear(); // Aseguramos que la rama sea FALSE al iniciar
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    
    const service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Probar getToken con token (Rama 1 de getToken)
    localStorage.setItem('token', 'abc');
    expect(service.getToken()).toBe('abc');

    // Probar getToken sin token (Rama 2 de getToken)
    localStorage.removeItem('token');
    expect(service.getToken()).toBeNull();

    // Probar login exitoso (Rama de éxito)
    service.login({}).subscribe();
    const req = httpMock.expectOne(r => r.url.endsWith('/login'));
    req.flush({ id: 1 });

    // Probar logout
    service.logout();
    expect(service.isAuthenticated()).toBeFalse();

    httpMock.verify();
  });
});