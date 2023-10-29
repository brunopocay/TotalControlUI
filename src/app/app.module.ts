import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from '../app/Components/login/login.component';
import { LoginDiretoComponent } from '../app/Components/login/login-direto/login-direto.component';
import { RegisterComponent } from '../app/Components/login/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './Services/auth.interceptor';
import { UserIsLoggedInComponent } from './Components/user-is-logged-in/user-is-logged-in.component';
import { ModalLogoutComponent } from './Components/user-is-logged-in/modal-logout/modal-logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContasComponent } from './Components/contas/contas.component';
import { TabelaContasComponent } from './Components/tabela-contas/tabela-contas.component';
import { CustomErrorHttpInterceptor } from './Services/StatusTextInterceptor';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ListContasComponent } from './Components/tabela-contas/list-contas/list-contas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    UserIsLoggedInComponent,
    LoginDiretoComponent,
    RegisterComponent,
    UserIsLoggedInComponent,
    ModalLogoutComponent,
    ContasComponent,
    TabelaContasComponent,
    ListContasComponent,
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
