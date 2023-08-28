import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { CounterComponent } from './Components/counter/counter.component';
import { authGuard } from './Guards/auth.guard';
import { UserIsLoggedInComponent } from './Components/user-is-logged-in/user-is-logged-in.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UserIsLoggedInComponent, canActivate: [authGuard]},
  { path: 'counter', component: CounterComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
