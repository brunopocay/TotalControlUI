import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCadastroDeContasComponent } from 'src/app/Components/modal-cadastro-de-contas/modal-cadastro-de-contas.component';

@Component({
  selector: 'app-tabela-registros',
  templateUrl: './registrosmensais.component.html',
  styleUrls: ['./registrosmensais.component.css'],
})
export class RegistroMensaisComponent implements OnInit {
  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    
  }
  openModalCadastroDeContas() {
    const modalRef = this.modalService.open(ModalCadastroDeContasComponent);
    modalRef.componentInstance.title = 'Cadastrar Contas e Categorias';
    modalRef.componentInstance.btnOkText = 'Cadastrar';
    modalRef.componentInstance.btnCancelText = 'Cancelar';
  }
}
