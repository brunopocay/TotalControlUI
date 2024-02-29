import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/Models/Category';
import { ListRegistrosComponent } from '../List-registros/list-registros.component';

@Component({
  selector: 'app-modal-cadastro-de-contas',
  templateUrl: './modal-cadastro-de-contas.component.html',
  styleUrls: ['./modal-cadastro-de-contas.component.css'],
})
export class ModalCadastroDeContasComponent {
  @Input() title: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @ViewChild(ListRegistrosComponent)
  private listRegistrosComponent: ListRegistrosComponent;

  constructor(private modalService: NgbModal) {}

  cancelar() {
    this.modalService.dismissAll();
  }
  dismiss() {
    this.modalService.dismissAll();
  }

  registrar() {
    this.listRegistrosComponent.RegisterBill();
  }
}
