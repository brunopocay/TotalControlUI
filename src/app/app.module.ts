import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AuthInterceptor } from './Services/auth.interceptor';
import { CustomErrorHttpInterceptor } from './Services/StatusTextInterceptor';
import { NavMenuComponent } from './Components/NavMenu/nav-menu.component';
import { HomeComponent } from './Views/Home/home.component';
import { LoginComponent } from './Views/Login/login.component';
import { LoginDiretoComponent } from '../app/Components/Login/login-direto/login-direto.component';
import { RegisterComponent } from '../app/Components/Login/register/register.component';
import { UserIsLoggedInComponent } from './Components/user-is-logged-in/user-is-logged-in.component';
import { ModalLogoutComponent } from './Components/user-is-logged-in/modal-logout/modal-logout.component';
import { ContasComponent } from './Components/contas/contas.component';
import { RegistroMensaisComponent } from './Views/RegistrosMensais/registrosmensais.component';
import { ListRegistrosComponent } from './Components/List-registros/list-registros.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    LoginDiretoComponent,
    RegisterComponent,
    UserIsLoggedInComponent,
    ModalLogoutComponent,
    ContasComponent,
    RegistroMensaisComponent,
    ListRegistrosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CurrencyMaskModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomErrorHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
