import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Views/Home/home.component';
import { LoginComponent } from './Views/Login/login.component';
import { authGuard } from './Guards/auth.guard';
import { InfoUsuarioComponent } from './Views/InfoUsuarios/infousuario.component';
import { SelecaoMesComponent } from './Views/SelecaoMes/selecaomes.component';
import { RegistroMensaisComponent } from './Views/RegistrosMensais/registrosmensais.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'usuario',
    component: InfoUsuarioComponent,
    canActivate: [authGuard],
  },
  { path: 'contas', component: SelecaoMesComponent, canActivate: [authGuard] },
  {
    path: 'contas/tabelacontas/:mes',
    component: RegistroMensaisComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
