import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Views/Dashboard/home.component';
import { LoginComponent } from './Views/Login/login.component';
import { authGuard } from './Guards/auth.guard';
import { InfoUsuarioComponent } from './Views/MeusDados/infousuario.component';
import { SelecaoMesComponent } from './Views/ListaMeses/selecaomes.component';
import { ListaDeContasComponent } from './Components/lista-de-contas/lista-de-contas.component';

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
    component: ListaDeContasComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
