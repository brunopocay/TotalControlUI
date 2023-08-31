import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Models/Users';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-is-logged-in',
  templateUrl: './user-is-logged-in.component.html',
  styleUrls: ['./user-is-logged-in.component.css']
})
export class UserIsLoggedInComponent implements OnInit {

  Users: Users = {
    Nome:'',
    Email: '',
    Sexo: '',
    DataNasc: '',
  };

  constructor(private authService: AuthService){}

  ngOnInit(): void {
   this.getMe()
  }
  
  getMe(){
    this.authService.GetUser().subscribe((claim: string) => {
      this.Users.Nome = claim[0];
      this.Users.Email = claim[1];
      this.Users.Sexo = claim[2];
      this.Users.DataNasc = claim[3];
      console.log(claim)
    })
  }
}
