import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Category, TipoCategoria } from 'src/app/Models/Category';
import { CategoriasService } from 'src/app/Services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabela-contas',
  templateUrl: './tabela-contas.component.html',
  styleUrls: ['./tabela-contas.component.css'],
})
export class TabelaContasComponent implements OnInit {
  tipoCategoriaEnum: { [value: string]: TipoCategoria } = {
    'Despesa': TipoCategoria.Despesa,
    'Renda': TipoCategoria.Renda,
    'Renda Extra': TipoCategoria.RendaExtra,
    'Retorno Investimento': TipoCategoria.RetornoInvestimento,
  };

  tipoCategoriaArray = Object.entries(this.tipoCategoriaEnum).map(
    ([key, value]) => ({ key, value })
  );

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
    this.categoria.tipoCategorias = parseInt(this.selectedCategoria);
    this.service
      .NewCategory(this.categoria)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status) {
            Swal.fire({
              title: 'Não foi possível cadastrar a categoria!',              
              icon: 'error',
              iconColor: 'red',
              showConfirmButton: true,
            });
          }
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        Swal.fire({
          title: 'Categoria cadastrada com sucesso',
          icon: 'success',
          iconColor: 'green',
          showConfirmButton: true,
        });
        
        this.GetCategoria();
      });
  }
}
