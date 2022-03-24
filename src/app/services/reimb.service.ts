import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReimbService {
  private endpointUrl: string = 'http://localhost:7777/users/';
  constructor(private http: HttpClient) {}

  getAllReimbsByUserId(id: number) {
    return this.http.get<any>(this.endpointUrl + id + '/reimbursements');
  }

  createRequest(id: number, data: any) {
    return this.http.post<any>(this.endpointUrl + id + '/reimbursements', data);
  }

  updateRequest(userId: number, reimbId: number, data: any) {
    return this.http.put<any>(
      this.endpointUrl + userId + '/reimbursements/' + reimbId,
      data
    );
  }

  deleteRequest(userId: number, reimbId: number) {
    return this.http.delete<any>(
      this.endpointUrl + userId + '/reimbursements/' + reimbId
    );
  }
}
