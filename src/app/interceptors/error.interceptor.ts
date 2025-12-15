import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 401: No autorizado (Token expirado o inválido)
      // 403: Prohibido (No tiene los roles necesarios)
      if ([401, 403].includes(error.status)) {
        console.error('Sesión expirada o falta de permisos. Redirigiendo...');
        authService.logout(); // Limpiamos el localStorage y el signal
        router.navigate(['/login']);
      }

      // Extraemos el mensaje de error para que el componente lo use
      const errorMessage = error.error?.message || error.statusText || 'Error desconocido';
      return throwError(() => new Error(errorMessage));
    })
  );
};