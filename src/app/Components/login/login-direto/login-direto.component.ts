import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login.component';
import { AuthService } from 'src/app/Services/auth.service';
import { UserRequest } from 'src/app/Models/UserRequest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login-direto',
  templateUrl: './login-direto.component.html',
  styleUrls: ['./login-direto.component.css'],
})
export class LoginDiretoComponent implements OnInit {
  user: UserRequest;
  loginForm: FormGroup;
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formbuilder: FormBuilder
  ) {}

  showSpan: boolean = false;
  responseError: boolean = false;
  responseMessageError: string = '';
  fieldTextType: boolean;

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      Email: ['', Validators.required],
      Senha: ['', Validators.required],
    });
  }

  registerOnClick() {
    this.loginComponent.showTab('register');
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.showSpan = true;

      setTimeout(() => {
        this.authService
          .login(formData)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 0) {
                this.showSpan = false;
                this.responseError = true;
                this.responseMessageError = 'Erro interno do servidor';
                setTimeout(() => {
                  this.responseError = false;
                }, 1500);
              } else {
                this.showSpan = false;
                this.responseError = true;
                this.responseMessageError = error.error;
                setTimeout(() => {
                  this.responseError = false;
                }, 1000);
              }
              return throwError(() => error);
            })
          )
          .subscribe((token: string) => {
            this.showSpan = false;
            this.responseError = false;
            localStorage.setItem('authToken', token);
            this.router.navigate(['/usuario']);
          });
      }, 1000);
    }
  }
}
