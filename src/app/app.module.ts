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
import { LoginDiretoComponent } from './Components/Login/login-direto/login-direto.component';
import { RegisterComponent } from '../app/Components/Login/register/register.component';
import { InfoUsuarioComponent } from './Views/InfoUsuarios/infousuario.component';
import { PopUpLogoutComponent } from './Components/PopUpLogout/popuplogout.component';
import { SelecaoMesComponent } from './Views/SelecaoMes/selecaomes.component';
import { RegistroMensaisComponent } from './Views/RegistrosMensais/registrosmensais.component';
import { ListRegistrosComponent } from './Components/List-registros/list-registros.component';
import { ListaDeContasComponent } from './Components/lista-de-contas/lista-de-contas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    LoginDiretoComponent,
    InfoUsuarioComponent,
    RegisterComponent,
    PopUpLogoutComponent,
    SelecaoMesComponent,
    RegistroMensaisComponent,
    ListRegistrosComponent,
    ListaDeContasComponent,
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
