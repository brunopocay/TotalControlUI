import { Component, OnInit } from '@angular/core';
import { FormValidators } from '../../../Helpers/form-validators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup ;
  showErrorEmail = false;
  showError = false;
  responseMessageError = "";
  fieldTextType:boolean;
  repeatFieldTextType:boolean;

  
  constructor (private router: Router, private formBuilder:FormBuilder, private service: AuthService){}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      Nome: ['', Validators.required],
      DataNasc: ['', Validators.required],
      Sexo: ['', Validators.required],
      Email: ['', Validators.required],
      Senha: ['', Validators.required],
      ConfirmarSenha: [null, Validators.required, FormValidators.equalsTo('Senha')]
    })
  }

  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
  }

  repeatToggleFieldTextType(){
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  RegisterNewUser() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      setTimeout(() => {
        this.service.register(formData).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status) {
              this.showError = true;
              this.responseMessageError = "Erro interno de servidor";
              setTimeout(() => {
                this.showError = false;
              }, 2500);
            } else {
              this.showErrorEmail = true;
              this.responseMessageError = error.error;
              setTimeout(() => {
                this.showErrorEmail = false;
              }, 3000);
            }
            return throwError(() => error);
          })
        )
        .subscribe((token: string) => {
          localStorage.setItem('authToken', token);
          this.router.navigate(['/usuario']);
        });
      }, 250);
    }
  }
  
}
