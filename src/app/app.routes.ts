import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { RegisterComponent } from './pages/register/register';
import { LaboratorioComponent } from './pages/laboratorio/laboratorio';
import { ExamenesComponent } from './pages/examenes/examenes';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'laboratorio', component: LaboratorioComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'examenes', component: ExamenesComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/usuarios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
