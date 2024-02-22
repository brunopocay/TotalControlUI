import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-popup-logout',
  templateUrl: './popuplogout.component.html',
  styleUrls: ['./popuplogout.component.css'],
})
export class PopUpLogoutComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  logout(): void {
    this.authService.removeAuthToken();
    this.router.navigate(['/login']);
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.logout();
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
