import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Bills } from '../Models/Bills';

@Injectable({
  providedIn: 'root'
})
export class ControleMensalService {

  private url = 'registrofinanceiromensal'

  constructor(private http: HttpClient) { }

  public GetControl(){
    return this.http.get<Bills[]>(`${environment.apiURL}/${this.url}`);
  }

  public RegisterBills(contas: Bills){
    return this.http.post<Bills>(`${environment.apiURL}/${this.url}`, contas);
  }
}
