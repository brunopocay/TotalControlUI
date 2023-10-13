import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabela-contas',
  templateUrl: './tabela-contas.component.html',
  styleUrls: ['./tabela-contas.component.css']
})
export class TabelaContasComponent implements OnInit {

  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
   
  }


}
