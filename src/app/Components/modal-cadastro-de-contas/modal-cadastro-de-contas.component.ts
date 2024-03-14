import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { TimeToBrazil } from 'src/app/Helpers/TimeStamp';
import { Category, TipoConta } from 'src/app/Models/Category';
import { MesControle } from 'src/app/Models/Month';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { ControleMensalService } from 'src/app/Services/controle-mensal.service';
import { DataMonthService } from 'src/app/Shared/data-month.service';
import Swal from 'sweetalert2';
import { Bills } from 'src/app/Models/Bills';

@Component({
  selector: 'app-modal-cadastro-de-contas',
  templateUrl: './modal-cadastro-de-contas.component.html',
  styleUrls: ['./modal-cadastro-de-contas.component.css'],
})
export class ModalCadastroDeContasComponent {
  formData: any = {};
  categoriaSelecionada: Category | undefined;
  registrationFormContas: FormGroup;
  registrationFormCategoria: FormGroup;
  mes: MesControle;
  contas: Bills[];
  listCategorias: Category[];
  showFormContas: boolean = true;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private service: ControleMensalService,
    private categoryservice: CategoriasService,
    private monthDataService: DataMonthService
  ) {}

  @Input() title: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Output() onRegister: EventEmitter<any> = new EventEmitter();

  tipoCategoriaEnum: { [value: string]: TipoConta } = {
    Despesa: TipoConta.Despesa,
    Renda: TipoConta.Renda,
    'Renda Extra': TipoConta.RendaExtra,
    'Retorno Investimento': TipoConta.RetornoInvestimento,
  };

  tipoCategoriaArray = Object.entries(this.tipoCategoriaEnum).map(
    ([key, value]) => ({ key, value })
  );

  ngOnInit(): void {
    this.GetDataMonth();
    this.registrationFormContas = this.formBuilder.group({
      categoria: ['', Validators.required],
      tipoConta: ['', Validators.required],
      valorDaConta: ['', Validators.required],
      descricao: ['', Validators.required],
    });
    this.registrationFormCategoria = this.formBuilder.group({
      nomeCategoria: ['', Validators.required],
      tipoCategorias: ['', Validators.required],
    });
    this.GetCategory();
  }

  cancelar() {
    if (!this.showFormContas) {
      this.showFormContas = true;
    } else {
      this.modalService.dismissAll();
    }
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  registrar() {
    if (this.showFormContas) {
      this.RegisterBill();
    } else {
      this.RegisterCategory();
    }
  }

  ToogleForm() {
    this.showFormContas = false;
  }

  GetDataMonth() {
    const monthData = this.monthDataService.GetMonthData();
    this.mes = monthData;
  }

  GetCategory() {
    this.categoryservice.GetCategory().subscribe((result) => {
      this.listCategorias = [];
      this.listCategorias = result;
    });
  }

  GetSelectedCategoryType() {
    const idCategoriaSelecionado: Category =
      this.registrationFormContas.get('categoria')?.value;
    this.categoriaSelecionada = this.listCategorias.find(
      (cat) => cat.id == idCategoriaSelecionado
    );

    if (this.categoriaSelecionada) {
      this.registrationFormContas
        .get('tipoConta')!
        .setValue(this.categoriaSelecionada.tipoCategorias);
    }
  }

  RegisterBill() {
    if (this.registrationFormContas.valid) {
      const formValues = this.registrationFormContas.value;
      const formData: Bills = {
        categoria: this.categoriaSelecionada,
        mesId: this.mes.id!,
        diaInclusao: TimeToBrazil(Date.now()),
        tipoConta: formValues.tipoConta,
        valorDaConta: formValues.valorDaConta,
        descricao: formValues.descricao,
      };
      this.service
        .RegisterBills(formData)
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
            return throwError(() => error);
          })
        )
        .subscribe(() => {
          this.onRegister.emit(formData);
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
    if (this.registrationFormCategoria.valid) {
      const formData = this.registrationFormCategoria.value;
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
            this.showFormContas = false;
            this.registrationFormCategoria.reset();
            return throwError(() => error);
          })
        )
        .subscribe(() => {
          this.GetCategory();
          Swal.fire({
            title: 'Categoria cadastrada com sucesso',
            icon: 'success',
            iconColor: 'green',
            showConfirmButton: true,
          });
        });
      this.registrationFormCategoria.reset();
      this.showFormContas = true;
    }
  }
}
