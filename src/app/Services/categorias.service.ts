import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Models/Category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  private url = 'Category'

  public GetCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiURL}/${this.url}`)
  }

  public NewCategory(categoria: Category): Observable<Category>{
    return this.http.post<Category>(`${environment.apiURL}/${this.url}`, categoria)
  }

}
