import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { UserRequest } from '../Models/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "Auth";
  constructor(private http: HttpClient) { }

  login(user: UserRequest): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'text' as const };
    return this.http.post(`${environment.apiURL}/${this.url}/login`, JSON.stringify(user) ,httpOptions);
  }

  public getMe(): Observable<string>{
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'text' as const };
    return this.http.get(`${environment.apiURL}/${this.url}`,httpOptions)
  }
}
 