import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saldos } from '../Models/Saldos';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GetSaldosService {
  private url = 'Saldos';
  constructor(private http: HttpClient) {}

  getSaldos(mesId:number): Observable<Saldos[]> {
    return this.http.get<Saldos[]>(`${environment.apiURL}/${this.url}`, { params: {mesId} });
  }
}
