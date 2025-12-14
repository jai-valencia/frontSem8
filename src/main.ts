import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { jwtInterceptor } from './app/interceptors/jwt';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
});
