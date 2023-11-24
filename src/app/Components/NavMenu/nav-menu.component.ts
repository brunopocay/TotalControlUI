import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './Nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  
  constructor(private authGuard: AuthService) { }

  UserIsLoggedIn():boolean {
    return this.authGuard.isAuthenticated();
  }
  
}
