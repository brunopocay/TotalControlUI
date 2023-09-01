import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { HomeComponent } from './Components/home/home.component';
import { CounterComponent } from './Components/counter/counter.component';
import { LoginComponent } from '../app/Components/login/login.component';
import { LoginDiretoComponent } from '../app/Components/login/login-direto/login-direto.component';
import { RegisterComponent } from '../app/Components/login/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './Services/auth.interceptor';
import { authGuard } from './Guards/auth.guard';
import { UserIsLoggedInComponent } from './Components/user-is-logged-in/user-is-logged-in.component';
import { ModalLogoutComponent } from './Components/user-is-logged-in/modal-logout/modal-logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LoginComponent,
    UserIsLoggedInComponent,
    LoginDiretoComponent,
    RegisterComponent,
    UserIsLoggedInComponent,
    ModalLogoutComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
