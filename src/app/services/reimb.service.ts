import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const man_url = environment.BACKEND_URL;
const emp_url = environment.BACKEND_URL + '/users/';

@Injectable({
  providedIn: 'root',
})
export class ReimbService {
  constructor(private http: HttpClient) {}

  // ================= employees methods ======================= //
  getAllReimbsByUserId(id: number) {
    return this.http.get<any>(emp_url + id + '/reimbursements');
  }

  createRequest(id: number, data: any) {
    return this.http.post<any>(emp_url + id + '/reimbursements', data);
  }

  updateRequest(userId: number, reimbId: number, data: any) {
    return this.http.put<any>(
      emp_url + userId + '/reimbursements/' + reimbId,
      data
    );
  }

  deleteRequest(userId: number, reimbId: number) {
    return this.http.delete<any>(
      emp_url + userId + '/reimbursements/' + reimbId
    );
  }

  // ================= managers methods ======================= //
  getAllReimbursement() {
    return this.http.get<any>(man_url + '/reimbursements');
  }

  authorizeReimbursement(reimbId: number, statusId: number) {
    //const queryParams = new HttpParams();
    //queryParams.append('authorizedStatusId', statusId);

    return this.http.patch<any>(
      man_url +
        '/reimbursements/' +
        reimbId +
        '?authorizedStatusId=' +
        statusId,
      {}
    );
  }
}
