import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bills } from 'src/app/Models/Bills';
import { ControleMensalService } from 'src/app/Services/controle-mensal.service';
import { ModalCadastroDeContasComponent } from '../modal-cadastro-de-contas/modal-cadastro-de-contas.component';

@Component({
  selector: 'app-lista-de-contas',
  templateUrl: './lista-de-contas.component.html',
  styleUrls: ['./lista-de-contas.component.css'],
})
export class ListaDeContasComponent implements OnInit {
  Contas: Bills[] = [];
  tipoRenda: Bills[] = [];
  tipoRendaExtra: Bills[] = [];
  tipoDespesa: Bills[] = [];
  tipoRetornoInvestimento: Bills[] = [];

  constructor(
    private billsService: ControleMensalService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.GetContas();
  }

  GetContas() {
    this.billsService.GetControl().subscribe((ListaDeContas) => {
      this.Contas = [];
      let mes = JSON.parse(localStorage.getItem('monthsData')!);
      let ListaDeContasFiltrados = ListaDeContas.filter((conta) => conta.mes.id === mes.id);
      this.Contas = ListaDeContasFiltrados;
      this.FilterTiposContas(ListaDeContasFiltrados);
    });
  }

  openModalCadastroDeContas() {
    const modalRef = this.modalService.open(ModalCadastroDeContasComponent);
    modalRef.componentInstance.title = 'Cadastrar Contas e Categorias';
    modalRef.componentInstance.btnOkText = 'Cadastrar';
    modalRef.componentInstance.btnCancelText = 'Cancelar';
    modalRef.componentInstance.onRegister.subscribe((newBill: Bills) => {
      this.Contas.push(newBill);
      this.FilterTiposContas(this.Contas);
    });
  }

  public FilterTiposContas(contas: Bills[]) {
    this.tipoRendaExtra = [];
    this.tipoRenda = [];
    this.tipoDespesa = [];
    this.tipoRetornoInvestimento = [];

    contas.forEach((element) => {
      switch (element.tipoConta.toString()) {
        case 'RendaExtra':
          this.tipoRendaExtra.push(element);
          break;
        case 'Renda':
          this.tipoRenda.push(element);
          break;
        case 'Despesa':
          this.tipoDespesa.push(element);
          break;
        case 'RetornoInvestimento':
          this.tipoRetornoInvestimento.push(element);
          break;

        default:
          break;
      }
    });
  }
}
