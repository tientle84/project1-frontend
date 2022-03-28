import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReimbService {
  private empEndpointUrl: string = 'http://localhost:7777/users/';
  private ManEndpointUrl: string = 'http://localhost:7777';
  constructor(private http: HttpClient) {}

  // ================= employees methods ======================= //
  getAllReimbsByUserId(id: number) {
    return this.http.get<any>(this.empEndpointUrl + id + '/reimbursements');
  }

  createRequest(id: number, data: any) {
    return this.http.post<any>(
      this.empEndpointUrl + id + '/reimbursements',
      data
    );
  }

  updateRequest(userId: number, reimbId: number, data: any) {
    return this.http.put<any>(
      this.empEndpointUrl + userId + '/reimbursements/' + reimbId,
      data
    );
  }

  deleteRequest(userId: number, reimbId: number) {
    return this.http.delete<any>(
      this.empEndpointUrl + userId + '/reimbursements/' + reimbId
    );
  }

  // ================= managers methods ======================= //
  getAllReimbursement() {
    return this.http.get<any>(this.ManEndpointUrl + '/reimbursements');
  }

  authorizeReimbursement(reimbId: number, statusId: number) {
    //const queryParams = new HttpParams();
    //queryParams.append('authorizedStatusId', statusId);

    return this.http.patch<any>(
      this.ManEndpointUrl +
        '/reimbursements/' +
        reimbId +
        '?authorizedStatusId=' +
        statusId,
      {}

      // this.ManEndpointUrl + '/reimbursements/' + reimbId,
      // {},
      // { params: { authorizedStatusId: statusId } }
    );
  }
}
