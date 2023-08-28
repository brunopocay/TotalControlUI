import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  activeTab: string = 'login';

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    if(this.UserIsLoggedIn() == true){
      this.router.navigate(['usuario']);
    }
  }

  UserIsLoggedIn():boolean {
    return this.authService.isAuthenticated();
  }
  
  showTab(tab: string) {
    this.activeTab = tab;
  } 
}
