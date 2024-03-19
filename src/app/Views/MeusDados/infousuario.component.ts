import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/Models/Users';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './infousuario.component.html',
  styleUrls: ['./infousuario.component.css'],
})
export class InfoUsuarioComponent implements OnInit {
  Users: Users = {
    Nome: '',
    Email: '',
    Sexo: '',
    DataNasc: '',
  };

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getMe();
  }

  public openModal() {
    Swal.fire({
      title: 'Você deseja fazer logout?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Não',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }

  getMe() {
    this.authService.GetUser().subscribe((claim: string) => {
      const parseClaims = JSON.parse(claim);
      this.Users.Nome = parseClaims[0];
      this.Users.Email = parseClaims[1];
      this.Users.Sexo = parseClaims[2];
      this.Users.DataNasc = parseClaims[3];
    });
  }

  logout(): void {
    this.authService.removeAuthToken();
    localStorage.removeItem('monthsData');
    this.route.navigate(['/login']);
  }
}
