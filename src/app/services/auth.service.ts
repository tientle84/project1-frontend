import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:7777/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(AUTH_API + 'login', data, httpOptions);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(AUTH_API + 'register', data, httpOptions);
  }
}
