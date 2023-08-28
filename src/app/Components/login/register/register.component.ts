import { Component, OnInit } from '@angular/core';
import { FormValidators } from '../../form_validators/form-validators';
import { Router } from '@angular/router';
import { Users } from 'src/app/Models/Users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup ;
  
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


  RegisterNewUser(){ 
    if(this.registrationForm.valid){       
        const formData = this.registrationForm.value;
        this.service.register(formData).subscribe((token: string) => {
          localStorage.setItem('authToken', token);
          this.router.navigate(['/usuario']);
        })    
      }        
    }
}
