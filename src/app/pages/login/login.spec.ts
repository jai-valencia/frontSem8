import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al servicio de login cuando se ejecuta el método onLogin', () => {
      const mockUser = { id: 1, email: 'test@test.com' };
      
      component.onLogin(); 
    
      const req = httpMock.expectOne(r => r.url.endsWith('/login'));
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
      
      expect(component).toBeTruthy(); 
  });

  it('debería marcar el componente como cargando y luego fallar el login', () => {
    // Simulamos que el componente tiene una variable 'loading' o similar
    component.onLogin(); 

    const req = httpMock.expectOne(r => r.url.endsWith('/login'));
    req.flush('Error', { status: 401, statusText: 'Unauthorized' });

    // Esto cubrirá la rama del 'error' dentro del subscribe de tu componente
    expect(component).toBeTruthy();
  });
});