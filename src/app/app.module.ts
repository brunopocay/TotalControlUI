import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule,NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AuthInterceptor } from './Services/auth.interceptor';
import { CustomErrorHttpInterceptor } from './Services/StatusTextInterceptor';
import { NavMenuComponent } from './Components/NavMenu/nav-menu.component';
import { HomeComponent } from './Views/Dashboard/home.component';
import { LoginComponent } from './Views/Login/login.component';
import { InfoUsuarioComponent } from './Views/MeusDados/infousuario.component';
import { SelecaoMesComponent } from './Views/ListaMeses/selecaomes.component';
import { ListaDeContasComponent } from './Components/lista-de-contas/lista-de-contas.component';
import { LoginDiretoComponent } from './Components/login/login-direto/login-direto.component';
import { RegisterComponent } from './Components/login/register/register.component';
import { ModalCadastroDeContasComponent } from './Components/modal-cadastro-de-contas/modal-cadastro-de-contas.component';
import { TableListaContasComponent } from './Components/table-lista-contas/table-lista-contas.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ContainerComponent } from './Components/container/container.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    InfoUsuarioComponent,
    LoginDiretoComponent,
    RegisterComponent,
    SelecaoMesComponent,
    ListaDeContasComponent,
    ModalCadastroDeContasComponent,
    TableListaContasComponent,
    FooterComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CurrencyMaskModule,
    NgbPaginationModule,
    NgbTypeaheadModule
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
