import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_USERS_URL = environment.urlBE + 'api/users/';

@Injectable({ providedIn: 'root' })
export class ExchangeService {
  constructor(private http: HttpClient) {}

  getlistExchange(accountId: any, page?: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    let url;
    if (page) {
      url = API_USERS_URL + userId + '/accounts/' + accountId + '/transactions?page=' + page;
    } else {
      url = API_USERS_URL + userId + '/accounts/' + accountId + '/transactions';
    }
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<any>(url, { headers: httpHeaders });
  }

  getUserExchange(params: any): Observable<any> {
    const url = API_USERS_URL + 'find';
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<any>(url, params);
  }

  exchange(params, id) {
    const userId = localStorage.getItem('userId');
    const url = API_USERS_URL + userId + `/accounts/` + id + `/tranferInternal/accountNumber`;
    return this.http.post<any>(url, params);
  }

  exchangeOTP(params) {
    const url = `http://localhost:8080/api/tranfer/confirm`;
    return this.http.post<any>(url, params);
  }

  getlistCheque(accountId: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    let url;
    url = API_USERS_URL + userId + '/accounts/' + accountId + '/transactions';
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<any>(url, { headers: httpHeaders });
  }

  uploadImage(files: File[]): Observable<any> {
    let formData = new FormData();
    for (let file of files) {
      formData.append('file', file);
    }
    formData.append('upload_preset', 'wuhiqv5l');
    formData.append('api_key', '943929211546985');
    const uri = `https://api.cloudinary.com/v1_1/dsww0ejaj/image/upload`;
    return this.http.post(uri, formData);
  }

  getLoan(): Observable<any> {
    const uri = environment.urlBE + `api/loanInterestRates`;
    return this.http.get(uri);
  }

  createLoan(params, userId): Observable<any> {
    const uri = environment.urlBE + `api/admin/users/` + userId + `/loanprofiles`;
    return this.http.post(uri, params);
  }

  getUserIn(userId): Observable<any> {
    const uri = environment.urlBE + `api/admin/users/` + userId + `/useableAccounts`;
    return this.http.get(uri);
  }

  addTstc(params, userId, id): Observable<any> {
    const uri = environment.urlBE + `api/admin/users/` + userId + `/loanprofiles/` + id + `/assets`;
    return this.http.post(uri, params);
  }

  getListLoan(userId): Observable<any> {
    const uri = environment.urlBE + `api/admin/users/` + userId +`/loanprofiles`;
    return this.http.get(uri);
  }

  approveHsv(params, userId): Observable<any> {
    const uri = environment.urlBE + `api/admin/users/` + userId +`/loanprofiles/confirm`;
    return this.http.post(uri, params);
  }

  comfirmHsv(params): Observable<any> {
    const uri = environment.urlBE + `api/admin/loanprofile/confirm`;
    return this.http.post(uri, params);
  }

  approvalVT(param): Observable<any> {
    const uri = environment.urlBE + `api/admin/loan-profiles/approved`;
    return this.http.post(uri, param);
  }

  rejectVT(param): Observable<any> {
    const uri = environment.urlBE + `api/admin/loan-profiles/reject`;
    return this.http.post(uri, param);
  }
  
  getListUsers(page?: string): Observable<any> {
    let uri
    if (page) {
      uri = environment.urlBE + `api/admin/users?page=` + page;
    } else {
      uri = environment.urlBE + `api/admin/users`;
    }
    return this.http.get(uri);
  }
  getAllLoans(page?): Observable<any> {
    let uri;
    if(!page) {
      uri = environment.urlBE + `api/admin/transaction-office/employee/loan-profiles`;
    } else {
      uri = environment.urlBE + `api/admin/transaction-office/employee/loan-profiles?page=` + page;
    }
    return this.http.get(uri);
  }

  getTransactionUser(userId: any,id: any,  page?: any): Observable<any> {
    let url;
    if (page) {
      url = environment.urlBE + `api/admin/users/`+ userId + `/accounts/`+ id + `/transactions?page=` + page;
    } else {
      url = environment.urlBE + `api/admin/users/`+ userId + `/accounts/`+ id + `/transactions`;
    }
    return this.http.get<any>(url);
  }

  getSec(param): Observable<any> {
    const uri = environment.urlBE + `api/admin/employee/cheques`;
    return this.http.post(uri, param);
  }

  rutSec(param): Observable<any> {
    const uri = environment.urlBE + `api/admin/cheques/withdraw`;
    return this.http.post(uri, param);
  }
}
