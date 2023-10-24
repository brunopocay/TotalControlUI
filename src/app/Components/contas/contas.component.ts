import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MesControle } from 'src/app/Models/Month';
import { MonthServicesService } from 'src/app/Services/month-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css'],
})
export class ContasComponent implements OnInit {

  selectedMonth: string = '';
  month: MesControle = {
    mes: '',
    ano: '',
  };

  months: MesControle[] = [];

  constructor(private service: MonthServicesService, private router: Router) {}

  ngOnInit(): void {
    this.getMonth();
  }

  navigateToTableMonth(mes: string) {
    this.router.navigate(['/contas/tabelacontas', mes]);
  }

  getMonth() {
    this.service.getMonth().subscribe((result: MesControle[]) => {
      this.months = [];
      this.months = result;
    });
  }

  ExcluirMes(mes: MesControle){  
      Swal.fire({
        title: 'Atenção <i class="fa-solid fa-triangle-exclamation"></i>',
        text: 'Tem certeza que deseja deletar o controle do mês de: ' + mes.mes + '/' + mes.ano + ' ?',
        icon: 'warning',
        iconColor: 'red',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if(result.isConfirmed){          
          this.service.deleteMonth(mes).subscribe(() => {           
            const index = this.months.findIndex((item) => item === mes);
            if (index !== -1) {
              this.months.splice(index, 1);
            }
          });
        }
      });   
  }

  cadastrarMes() {
    this.month.mes = this.selectedMonth;
    this.service
      .registerMonth(this.month)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 404) {        
            Swal.fire({
              title: 'Não foi possivel cadastrar!',
              text: error.error,
              icon: 'error',
              iconColor: 'red',
              showConfirmButton: true,
            });
          }
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        Swal.fire({
          title: 'Mês cadastrado com sucesso',
          icon: 'success',
          iconColor: 'green',
          showConfirmButton: true,
        });

        this.months.push(this.month);
      });
  }
}
