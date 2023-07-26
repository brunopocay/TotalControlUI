import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoas } from '../Models/Pessoas';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PessoasServices {

  private url = "Pessoas"
  constructor(private http: HttpClient) { }

  public RegisterNewPessoa(pessoa: Pessoas): Observable<Pessoas>{
    return this.http.post<Pessoas>(`${environment.apiURL}/${this.url}`, pessoa)
  }
}
