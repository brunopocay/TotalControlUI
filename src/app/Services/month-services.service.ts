import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MesControle } from '../Models/Month';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MonthServicesService {

  private url = "MesReferencia"

  constructor(private http: HttpClient) { }

  public GetMonth(){
    return this.http.get<MesControle[]>(`${environment.apiURL}/${this.url}`)
  }

  public registerMonth(mes: MesControle){
    return this.http.post<MesControle>(`${environment.apiURL}/${this.url}`, mes)
  }

  public deleteMonth(mes: MesControle){
    return this.http.put<MesControle>(`${environment.apiURL}/${this.url}`, mes)
  }
}

