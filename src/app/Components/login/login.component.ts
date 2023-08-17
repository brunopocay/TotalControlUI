import { Component, Input } from '@angular/core';
import { Users } from 'src/app/Models/Users';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: string = 'login';

  user?: Users;

  constructor(private authService: AuthService){}
  
  showTab(tab: string) {
    this.activeTab = tab;
  }

  getMe(){
    this.authService.getMe().subscribe((name: string) => {
      console.log(name)
    })
  }

  
}
