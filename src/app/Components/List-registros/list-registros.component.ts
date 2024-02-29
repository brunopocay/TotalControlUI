import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { TimeToBrazil } from 'src/app/Helpers/TimeStamp';
import { Category, TipoCategoria } from 'src/app/Models/Category';
import { MesControle } from 'src/app/Models/Month';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { ControleMensalService } from 'src/app/Services/controle-mensal.service';
import { DataMonthService } from 'src/app/Shared/data-month.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-registros',
  templateUrl: './list-registros.component.html',
  styleUrls: ['./list-registros.component.css'],
})
export class ListRegistrosComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private service: ControleMensalService,
    private categoryservice: CategoriasService,
    private monthDataService: DataMonthService
  ) {}

  registrationFormContas: FormGroup;
  formData: any = {};
  mes: MesControle;
  showFormContas: boolean = true;
  registrationFormCat: FormGroup;
  categorias: Category[];

  tipoCategoriaEnum: { [value: string]: TipoCategoria } = {
    Despesa: TipoCategoria.Despesa,
    Renda: TipoCategoria.Renda,
    'Renda Extra': TipoCategoria.RendaExtra,
    'Retorno Investimento': TipoCategoria.RetornoInvestimento,
  };

  tipoCategoriaArray = Object.entries(this.tipoCategoriaEnum).map(
    ([key, value]) => ({ key, value })
  );

  ngOnInit(): void {
    this.GetDataMonth();
    this.registrationFormContas = this.formBuilder.group({
      categoriaId: ['', Validators.required],
      tipoConta: ['', Validators.required],
      descricao: ['', Validators.required],
      valorDaConta: ['', Validators.required],
    });
    this.registrationFormCat = this.formBuilder.group({
      nomeCategoria: ['', Validators.required],
      tipoCategorias: ['', Validators.required],
    });
    this.GetCategory();
  }

  GetDataMonth() {
    const monthData = this.monthDataService.GetMonthData();
    this.mes = monthData;
  }

  GetCategory() {
    this.categoryservice.GetCategory().subscribe((result) => {
      this.categorias = [];
      this.categorias = result;
    });
  }

  GetSelectedCategoryType() {
    const idCategoriaSelecionado =
      this.registrationFormContas.get('categoriaId')!.value;
    const categoriaSelecionada = this.categorias.find(
      (cat) => cat.categoriaId == idCategoriaSelecionado
    );

    if (categoriaSelecionada) {
      this.registrationFormContas
        .get('tipoConta')!
        .setValue(categoriaSelecionada.tipoCategorias);
    }
  }

  ToogleForm() {
    this.showFormContas = false;
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
          this.registrationFormContas.reset();

          Swal.fire({
            title: 'Conta cadastrada com sucesso',
            icon: 'success',
            iconColor: 'green',
            showConfirmButton: true,
          });
        });
    }
  }

  RegisterCategory() {
    if (this.registrationFormCat.valid) {
      const formData = this.registrationFormCat.value;
      this.categoryservice
        .NewCategory(formData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status) {
              Swal.fire({
                title: 'Não foi possível cadastrar a categoria!',
                text: error.error,
                icon: 'error',
                iconColor: 'red',
                showConfirmButton: true,
              });
            }
            return throwError(() => error);
          })
        )
        .subscribe(() => {
          Swal.fire({
            title: 'Categoria cadastrada com sucesso',
            icon: 'success',
            iconColor: 'green',
            showConfirmButton: true,
          });
        });
      this.showFormContas = true;
    }
  }
}
