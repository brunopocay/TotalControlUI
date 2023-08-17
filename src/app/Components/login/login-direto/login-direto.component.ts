import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login.component';
import { AuthService } from 'src/app/Services/auth.service';
import { UserRequest } from 'src/app/Models/UserRequest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-direto',
  templateUrl: './login-direto.component.html',
  styleUrls: ['./login-direto.component.css']
})
export class LoginDiretoComponent implements OnInit {
  
  user: UserRequest;
  loginForm: FormGroup;
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  constructor(private router:Router, private authService: AuthService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      Email: ['', Validators.required],
      Senha: ['', Validators.required]
    })
  }

  registerOnClick(){
    this.loginComponent.showTab('register');
  }
  
  login(){
    if(this.loginForm.valid)
    {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe((token: string) => {
        localStorage.setItem('authToken', token);
        this.router.navigate(['/cadastro']);
      })
    }
  }
}


