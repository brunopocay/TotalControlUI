import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, TipoCategoria } from 'src/app/Models/Category';
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
    'RendaExtra',
    'RetornoInvestimento',
  ];

  selectedCategory: string = '';
  categorias: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: CategoriasService
  ) {}

  ngOnInit(): void {
    this.GetCategoria();
  }

  GetCategoria() {
    this.service.GetCategory().subscribe((result) => {
      this.categorias = [];
      this.categorias = result;
      console.log(this.categorias);
    });
  }
}
