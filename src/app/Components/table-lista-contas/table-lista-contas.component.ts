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
  filtroPesquisa: string = '';
  ordemAtual: 'asc' | 'desc' = 'asc';
  page = 1;
  pageSize = 5;

  get contasFiltradas(): Bills[] {
    return this.listaDeContas.filter((conta) =>
      Object.values(conta).some(
        (valor) =>
          typeof valor === 'string' &&
          valor.toLowerCase().includes(this.filtroPesquisa.toLowerCase())
      )
    );
  }

  get contasPaginadas(): Bills[] {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.contasFiltradas.length
    );
    return this.contasFiltradas.slice(startIndex, endIndex);
  }

  MaskValores(valor: number): string {
    return MaskValores(valor);
  }

  ordenarDados() {
    if (this.ordemAtual === 'asc') {
      this.ordemAtual = 'desc';
      this.listaDeContas.sort((a, b) => b.valorDaConta - a.valorDaConta);
    } else if (this.ordemAtual === 'desc') {
      this.ordemAtual = 'asc';
      this.listaDeContas.sort((a, b) => a.valorDaConta - b.valorDaConta);
    }
  }
}
