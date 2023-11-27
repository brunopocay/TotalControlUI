import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { TimeToBrazil } from 'src/app/Helpers/TimeStamp';
import { Category } from 'src/app/Models/Category';
import { MesControle } from 'src/app/Models/Month';
import { ControleMensalService } from 'src/app/Services/controle-mensal.service';
import { DataMonthService } from 'src/app/Shared/data-month.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-registros',
  templateUrl: './list-registros.component.html',
  styleUrls: ['./list-registros.component.css'],
})
export class ListRegistrosComponent implements OnInit {
  @Input() categorias: Category[];
  registrationFormContas: FormGroup;
  formData: any = {};
  mes: MesControle;

  constructor(
    private formBuilder: FormBuilder,
    private service: ControleMensalService,
    private monthDataService: DataMonthService
  ) {}

  ngOnInit(): void {
    this.GetDataMonth();
    this.registrationFormContas = this.formBuilder.group({
      categoriaId: ['', Validators.required],
      tipoConta: ['', Validators.required],
      descricao: ['', Validators.required],
      valorDaConta: ['', Validators.required],
    });
  }

  GetDataMonth() {
    const monthData = this.monthDataService.GetMonthData();
    this.mes = monthData;
  }

  GetSelectedCategoryType() {
    const idCategoriaSelecionado =
      this.registrationFormContas.get('categoriaId')!.value;
    const categoriaSelecionada = this.categorias.find(
      (cat) => cat.categoriaId == idCategoriaSelecionado
    );

    if (categoriaSelecionada) {
      this.registrationFormContas.get('tipoConta')!.setValue(categoriaSelecionada.tipoCategorias);
    }
  }

  RegisterBill() {
    if (this.registrationFormContas.valid) {
      this.formData = {
        ...this.formData,
        ...this.registrationFormContas.value,
        diaInclusao: TimeToBrazil(Date.now()),
        mesId: this.mes.id,
      };
      this.service
        .RegisterBills(this.formData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status) {
              Swal.fire({
                title: 'Não foi possível cadastrar a conta!',
                text: error.error,
                icon: 'error',
                iconColor: 'red',
                showConfirmButton: true,
              });
            }
            console.log(this.formData);
            return throwError(() => error);
          })
        )
        .subscribe(() => {
          Swal.fire({
            title: 'Conta cadastrada com sucesso',
            icon: 'success',
            iconColor: 'green',
            showConfirmButton: true,
          });
        });
    }
  }
}
