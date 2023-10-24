import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { CategoriasService } from 'src/app/Services/categorias.service';

@Component({
  selector: 'app-tabela-contas',
  templateUrl: './tabela-contas.component.html',
  styleUrls: ['./tabela-contas.component.css'],
})
export class TabelaContasComponent implements OnInit {
  tiposCategoria: string[] = [
    'Despesa',
    'Renda',
    'Renda Extra',
    'Retorno Investimento',
  ];

  selectedCategoria: string = '';
  categoria: Category = {
    nomeCategoria: '',
  };

  categorias: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: CategoriasService
  ) {}

  ngOnInit(): void {
    this.GetCategoria();
  }

  getSelectedTipoCategoria() {
    const categoriaSelecionada = this.categorias.find(
      (categoria) => categoria.nomeCategoria === this.selectedCategoria
    );

    if (categoriaSelecionada) {
      return categoriaSelecionada.tipoCategorias;
    } else {
      return '';
    }
  }

  GetCategoria() {
    this.service.GetCategory().subscribe((result) => {
      this.categorias = [];
      this.categorias = result;
    });
  }

  CadastrarCategoria() {
    this.categoria.nomeCategoria = this.selectedCategoria;
    this.service.NewCategory(this.categoria);
  }
}
