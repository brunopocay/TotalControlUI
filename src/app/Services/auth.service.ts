import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { UserRequest } from '../Models/UserRequest';
import { Users } from '../Models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "Auth";
  private authTokenkey = "authToken";
  constructor(private http: HttpClient) { }

  public register(user: Users): Observable<string>{
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'text' as const };
    return this.http.post(`${environment.apiURL}/${this.url}/register`, JSON.stringify(user) ,httpOptions);
  }

  public login(user: UserRequest): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'text' as const };
    return this.http.post(`${environment.apiURL}/${this.url}/login`, JSON.stringify(user) ,httpOptions);
  }

  public GetUser(): Observable<string>{
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'text' as const };
    return this.http.get(`${environment.apiURL}/${this.url}`,httpOptions)
  }

  public setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenkey, token);
  }
  
  public getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenkey);
  }

  public removeAuthToken(): void {
    localStorage.removeItem(this.authTokenkey);
  }

  public isAuthenticated(): boolean {
    const authToken = this.getAuthToken();

    return authToken !== null && authToken.trim() !== '';
  }

}
