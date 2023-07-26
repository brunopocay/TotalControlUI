import { Component, Input, OnInit } from '@angular/core';
import { FormValidators } from '../../form_validators/form-validators';
import { Router } from '@angular/router';
import { Pessoas } from 'src/app/Models/Pessoas';
import { PessoasServices } from 'src/app/Services/pessoas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup ;
  Users: Pessoas ;
  
  constructor (private router: Router, private formBuilder:FormBuilder, private service: PessoasServices){}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      Nome: ['', Validators.required],
      Documento: ['', Validators.required],
      DataNasc: ['', Validators.required],
      Sexo: ['', Validators.required],
      Email: ['', Validators.required],
      Senha: ['', Validators.required],
      ConfirmarSenha: [null, Validators.required, FormValidators.equalsTo('Senha')]
    })
  }


  RegisterNewUser(){ 
    if(this.registrationForm.valid)
    {
      const formData = this.registrationForm.value;
      this.service.RegisterNewPessoa(formData).subscribe((pessoas: Pessoas) => {
        this.Users = pessoas;   
        this.router.navigate(['/cadastro']);    
      });
    }
    else
    {
      alert('Preencha todos os campos corretamente');
    }
  }

}
