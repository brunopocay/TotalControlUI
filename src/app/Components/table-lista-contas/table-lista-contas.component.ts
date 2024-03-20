import { Component, Input } from '@angular/core';
import { MaskValores } from 'src/app/Helpers/MaskValores';
import { Bills } from 'src/app/Models/Bills';

@Component({
  selector: 'app-table-lista-contas',
  templateUrl: './table-lista-contas.component.html',
  styleUrls: ['./table-lista-contas.component.css'],
})
export class TableListaContasComponent {
  @Input() listaDeContas: Bills[];
  @Input() tableColor: string;

  MaskValores(valor: number): string {
    return MaskValores(valor);
  }
}
