import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Models/Users';
import { AuthService } from 'src/app/Services/auth.service';
import { DialogComponentService } from 'src/app/Shared/dialog-component.service';


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

  constructor(private authService: AuthService, private modalLogout: DialogComponentService){}

  ngOnInit(): void {
   this.getMe()
  }

  public openModal() {
    this.modalLogout.confirm('Logout', 'Deseja fazer logout do sistema ?');
  }

  getMe(){
    this.authService.GetUser().subscribe((claim: string) => {
      const parseClaims = JSON.parse(claim);
      this.Users.Nome = parseClaims[0];
      this.Users.Email = parseClaims[1];
      this.Users.Sexo = parseClaims[2];
      this.Users.DataNasc = parseClaims[3];
    })
  }
}
