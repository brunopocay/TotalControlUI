import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-cadastro-de-contas',
  templateUrl: './modal-cadastro-de-contas.component.html',
  styleUrls: ['./modal-cadastro-de-contas.component.css'],
})
export class ModalCadastroDeContasComponent {
  @Input() title: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private modalService: NgbModal) {}

  cancelar() {
    this.modalService.dismissAll();
  }
  dismiss() {
    this.modalService.dismissAll();
  }

  registrar() {

  }
}
