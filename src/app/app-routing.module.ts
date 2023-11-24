import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Views/Home/home.component';
import { LoginComponent } from './Views/Login/login.component';
import { authGuard } from './Guards/auth.guard';
import { UserIsLoggedInComponent } from './Components/user-is-logged-in/user-is-logged-in.component';
import { ContasComponent } from './Components/contas/contas.component';
import { RegistroMensaisComponent } from './Views/RegistrosMensais/registrosmensais.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UserIsLoggedInComponent, canActivate: [authGuard]},
  { path: 'contas', component: ContasComponent, canActivate: [authGuard]},
  { path: 'contas/tabelacontas/:mes', component: RegistroMensaisComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
