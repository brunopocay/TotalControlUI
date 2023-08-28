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
    Email: '',
  };

  constructor(private authService: AuthService){}

  ngOnInit(): void {
   this.getMe()
  }
  
  getMe(){
    this.authService.GetUser().subscribe((user: string) => {
      this.Users.Email = user
    })
  }
}
