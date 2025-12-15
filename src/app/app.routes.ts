import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes de Páginas
import { LoginComponent } from './pages/login/login';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { RegisterComponent } from './pages/register/register';
import { LaboratorioComponent } from './pages/laboratorio/laboratorio';
import { ExamenesComponent } from './pages/examenes/examenes';

// Componentes de Órdenes
import { OrdenFormComponent } from './components/orden-form/orden-form.component';
import { OrdenListComponent } from './components/orden-list/orden-list.component';

// Guard (Usa solo la versión funcional 'authGuard')
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Ruta inicial: Redirige al login o al listado según prefieras
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rutas Públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas Protegidas (Requieren Login)
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },
  { path: 'laboratorio', component: LaboratorioComponent, canActivate: [authGuard] },
  { path: 'examenes', component: ExamenesComponent, canActivate: [authGuard] },
  
  // Gestión de Órdenes
  { path: 'listado', component: OrdenListComponent, canActivate: [authGuard] },
  { path: 'nueva-orden', component: OrdenFormComponent, canActivate: [authGuard] },
  { path: 'editar/:id', component: OrdenFormComponent, canActivate: [authGuard] },

  // Comodín: Redirige cualquier ruta no encontrada al login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}