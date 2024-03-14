import { Component, OnInit } from '@angular/core';
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
      this.Contas = ListaDeContas;
    });
  }

  openModalCadastroDeContas() {
    const modalRef = this.modalService.open(ModalCadastroDeContasComponent);
    modalRef.componentInstance.title = 'Cadastrar Contas e Categorias';
    modalRef.componentInstance.btnOkText = 'Cadastrar';
    modalRef.componentInstance.btnCancelText = 'Cancelar';
    modalRef.componentInstance.onRegister.subscribe((newBill: Bills) => {
      this.Contas.push(newBill);
    });
  }
}
