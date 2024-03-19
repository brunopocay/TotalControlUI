import { Component, Input } from '@angular/core';
import { Bills } from 'src/app/Models/Bills';

@Component({
  selector: 'app-table-lista-contas',
  templateUrl: './table-lista-contas.component.html',
  styleUrls: ['./table-lista-contas.component.css'],
})
export class TableListaContasComponent {
  @Input() listaDeContas: Bills[];
  @Input() tableColor: string;

  protected MaskValorConta(valor: number): string {
    const valorFormatado = valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return valorFormatado;
  }
}
