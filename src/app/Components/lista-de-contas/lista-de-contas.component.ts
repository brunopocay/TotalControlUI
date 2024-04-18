import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bills } from 'src/app/Models/Bills';
import { ControleMensalService } from 'src/app/Services/controle-mensal.service';
import { ModalCadastroDeContasComponent } from '../modal-cadastro-de-contas/modal-cadastro-de-contas.component';
import { GetSaldosService } from 'src/app/Services/get-saldos.service';
import { Saldos } from 'src/app/Models/Saldos';
import {  Despesas,  Renda,  RendaExtra,  RetornoInvestimento,  SaldoTotal} from 'src/app/Helpers/consts';

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
  saldosRenda: Saldos | undefined;
  saldosRendaExtra: Saldos | undefined;
  saldosDespesa: Saldos | undefined;
  saldosInvestimento: Saldos | undefined;
  saldoTotal: Saldos | undefined;
  mes = JSON.parse(localStorage.getItem('monthsData')!);

  constructor(
    private billsService: ControleMensalService,
    private modalService: NgbModal,
    private saldosService: GetSaldosService
  ) {}

  ngOnInit(): void {
    this.GetContas();
    this.GetSaldos();
  }

  GetSaldos() {
    this.saldosService.getSaldos(this.mes.id).subscribe((listaDeSaldos) => {
      this.saldosRenda = listaDeSaldos.find(
        (saldo) => saldo.tipoConta == Renda
      );
      this.saldosRendaExtra = listaDeSaldos.find(
        (saldo) => saldo.tipoConta == RendaExtra
      );
      this.saldosDespesa = listaDeSaldos.find(
        (saldo) => saldo.tipoConta == Despesas
      );
      this.saldosInvestimento = listaDeSaldos.find(
        (saldo) => saldo.tipoConta == RetornoInvestimento
      );
      this.saldoTotal = listaDeSaldos.find(
        (saldo) => saldo.tipoConta == SaldoTotal
      );
    });
  }

  GetContas() {
    this.billsService.GetControl().subscribe((ListaDeContas) => {
      this.Contas = [];
      let ListaDeContasFiltrados = ListaDeContas.filter(
        (conta) => conta.mes.id === this.mes.id
      );
      this.Contas = ListaDeContasFiltrados;
      this.FilterTiposContas(ListaDeContasFiltrados);
    });
  }

  openModalCadastroDeContas() {
    const modalRef = this.modalService.open(ModalCadastroDeContasComponent, {size: 'lg'});
    modalRef.componentInstance.title = 'Cadastrar Contas e Categorias';
    modalRef.componentInstance.btnOkText = 'Cadastrar';
    modalRef.componentInstance.btnCancelText = 'Cancelar';
    modalRef.componentInstance.onRegister.subscribe((newBill: Bills) => {
      this.Contas.push(newBill);
      this.FilterTiposContas(this.Contas);
      this.GetSaldos();
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
