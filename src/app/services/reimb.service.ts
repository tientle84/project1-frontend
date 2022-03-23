import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReimbService {
  private endpointUrl: string = 'http://localhost:7777/users/';
  constructor(private http: HttpClient) {}

  getAllReimbsByUserId(id: number) {
    return this.http.get<any>(this.endpointUrl + id + '/reimbursements', {
      withCredentials: true,
    });
  }
}
