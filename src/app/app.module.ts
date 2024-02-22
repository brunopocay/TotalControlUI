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
import { InfoUsuarioComponent } from './Views/InfoUsuarios/infousuario.component';
import { PopUpLogoutComponent } from './Components/PopUpLogout/popuplogout.component';
import { SelecaoMesComponent } from './Views/SelecaoMes/selecaomes.component';
import { RegistroMensaisComponent } from './Views/RegistrosMensais/registrosmensais.component';
import { ListRegistrosComponent } from './Components/RegistrosMensais/List-registros/list-registros.component';
import { ListaDeContasComponent } from './Components/RegistrosMensais/lista-de-contas/lista-de-contas.component';
import { LoginDiretoComponent } from './Components/login/login-direto/login-direto.component';
import { RegisterComponent } from './Components/login/register/register.component';
import { ModalCadastroDeContasComponent } from './Components/modal-cadastro-de-contas/modal-cadastro-de-contas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    InfoUsuarioComponent,
    LoginDiretoComponent,
    RegisterComponent,
    PopUpLogoutComponent,
    SelecaoMesComponent,
    RegistroMensaisComponent,
    ListRegistrosComponent,
    ListaDeContasComponent,
    ModalCadastroDeContasComponent,
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
