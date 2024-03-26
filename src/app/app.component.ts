import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from './Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TotalControlUI';
  bodyStyleClass = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService
      .CheckTokenValidity()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.authService.removeAuthToken();
          this.router.navigate(['/login']);
          return throwError(() => `Token Invalido`);
        })
      )
      .subscribe(() => {
        if (this.authenticated() == false) {
          this.bodyStyleClass = 'not-authenticated';
        }
      });
  }

  protected authenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
