import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpointUrl: string = 'http://localhost:7777/';
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(this.endpointUrl + 'login', data);
  }

  register(data: any) {
    return this.http.post<any>(this.endpointUrl + 'register', data);
  }
}
