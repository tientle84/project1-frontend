import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url = environment.BACKEND_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

  // return the response as a HTTPResponse instead of the body only by default
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(url + '/login', data, httpOptions);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(url + '/register', data, httpOptions);
  }
}
