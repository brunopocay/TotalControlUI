import { Component, Input } from '@angular/core';
import { Pessoas } from 'src/app/Models/Pessoas';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: string = 'login';

  pessoa?: Pessoas;
  
  showTab(tab: string) {
    this.activeTab = tab;
  }

  
}
