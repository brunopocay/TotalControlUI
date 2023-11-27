import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Category, TipoCategoria } from 'src/app/Models/Category';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { DataMonthService } from 'src/app/Shared/data-month.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabela-registros',
  templateUrl: './registrosmensais.component.html',
  styleUrls: ['./registrosmensais.component.css'],
})
export class RegistroMensaisComponent implements OnInit {
  tipoCategoriaEnum: { [value: string]: TipoCategoria } = {
    'Despesa': TipoCategoria.Despesa,
    'Renda': TipoCategoria.Renda,
    'Renda Extra': TipoCategoria.RendaExtra,
    'Retorno Investimento': TipoCategoria.RetornoInvestimento,
  };

  tipoCategoriaArray = Object.entries(this.tipoCategoriaEnum).map(
    ([key, value]) => ({ key, value })
  );

  registrationFormCat: FormGroup;
  categorias: Category[] = [];

  constructor(
    private service: CategoriasService,
    private formBuilder: FormBuilder,
    private serviceMonthsData: DataMonthService
  ) {}

  ngOnInit(): void {
    this.registrationFormCat = this.formBuilder.group({
      nomeCategoria: ['', Validators.required],
      tipoCategorias: ['', Validators.required],
    });  
    this.GetCategory()
  }

  GetCategory() {
   this.service.GetCategory().subscribe((result) => {
      this.categorias = [];
      this.categorias = result; 
    });
  }

  RegisterCategory() {
    if(this.registrationFormCat.valid){
       const formData = this.registrationFormCat.value;
       this.service
         .NewCategory(formData)
         .pipe(
           catchError((error: HttpErrorResponse) => {
             if (error.status) {
               Swal.fire({
                 title: 'Não foi possível cadastrar a categoria!',
                 text: error.error,
                 icon: 'error',
                 iconColor: 'red',
                 showConfirmButton: true,
               });
             }
             return throwError(() => error);
           })
         )
         .subscribe(() => {
           Swal.fire({
             title: 'Categoria cadastrada com sucesso',
             icon: 'success',
             iconColor: 'green',
             showConfirmButton: true,
           });

           this.GetCategory();   
         });
      }
  }
}


