import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_USERS_URL = environment.urlBE + 'api/users/';

@Injectable({ providedIn: 'root' })
export class ExchangeService {
  uploadImage(selectedFiles: File[]) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getlistExchange(param: any, page?: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    let url;
    url = API_USERS_URL + userId + '/accounts/' + param.id + '/transactions';
    if (page) {
      url += '?page=' + page;
    } else {
      url += '?page=1';
    }
    if (param.nam) {
      url += '&year=' + param.nam;
    }
    if (param.thang) {
      url += '&month=' + param.thang;
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
    const url = API_USERS_URL + userId + `/accounts/` + id + `/transferInternal/accountNumber`;
    return this.http.post<any>(url, params);
  }

  exchangeOTP(params) {
    const url = `http://localhost:8080/api/transfer/confirm`;
    return this.http.post<any>(url, params);
  }

  getlistCheque(accountId: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    let url;
    url = API_USERS_URL + userId + '/accounts/' + accountId + '/cheques';
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<any>(url, { headers: httpHeaders });
  }

  createSec(params, userId, id): Observable<any> {
    let url = API_USERS_URL + userId + '/accounts/' + id + '/cheques';
    return this.http.post<any>(url, params);
  }

  deleteSec(userId, accId, id): Observable<any> {
    let url = API_USERS_URL + userId + '/accounts/' + accId + '/cheques/' + id + '/cancel';
    return this.http.get<any>(url);
  }

  getLoan(): Observable<any> {
    const uri = environment.urlBE + `api/loanInterestRates`;
    return this.http.get(uri);
  }
  getNotice(): Observable<any> {
    const uri = environment.urlBE + `api/users/current/notifications/totalUnread`;
    return this.http.get(uri);
  }

  getNoticeChat(): Observable<any> {
    const uri = environment.urlBE + `api/users/current/conversations/total-unread`;
    return this.http.get(uri);
  }

  updateSec(param): Observable<any> {
    const uri = environment.urlBE + `api/users/current/accounts/cheques/edit`;
    return this.http.post(uri, param);
  }

  createLoan(param): Observable<any> {
    const uri = environment.urlBE + `api/users/current/loanProfiles`;
    return this.http.post(uri, param);
  }

  getNoticelist(page?): Observable<any> {
    let uri;
    if(page) {
      uri = environment.urlBE + `api/users/current/notifications?page=` + page;
    } else {
      uri = environment.urlBE + `api/users/current/notifications`
    }
    return this.http.get(uri);
  }

  getListChat(): Observable<any> {
    const uri = environment.urlBE + `api/users/current/conversations`;
    return this.http.get(uri);
  }
  getChat(id): Observable<any> {
    const uri = environment.urlBE + `api/users/current/conversations/` + id + `/messages`;
    return this.http.get(uri);
  }

  chat(mess, id): Observable<any> {
    const uri = environment.urlBE + `api/users/current/conversations/` + id + `/messages`;
    return this.http.post(uri, mess);
  }

  newChat(mess): Observable<any> {
    const uri = environment.urlBE + `api/users/current/conversations`;
    return this.http.post(uri, mess);
  }

  getListVay(): Observable<any> {
    const uri = environment.urlBE + `api/users/current/loanProfiles`;
    return this.http.get(uri);
  }
}
