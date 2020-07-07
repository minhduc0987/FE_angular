import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_USERS_URL = environment.urlBE + 'api/users/';

@Injectable({providedIn: 'root'})
export class ExchangeService {

	constructor(private http: HttpClient) {
	}

	getlistExchange(accountId: any, page?: any): Observable<any> {
		const userId = sessionStorage.getItem('userId');
		let url;
		if (page) {
			url = API_USERS_URL + userId + '/accounts/' + accountId + '/transactions?page=' + page;
		} else {
			url = API_USERS_URL + userId + '/accounts/' + accountId + '/transactions';
		}
		const userToken = sessionStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<any>(url, {headers: httpHeaders})
	}

	getUserExchange(params: any): Observable<any> {
        const url = API_USERS_URL + 'find';
		const userToken = sessionStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.post<any>(url, params)
	}

	exchange(params, id) {
		const userId = sessionStorage.getItem('userId');
		const url = API_USERS_URL + userId + `/accounts/`+ id +`/transferInternal/accountNumber`;
		return this.http.post<any>(url, params)
	}

	exchangeOTP(params) {
		const url = `http://localhost:8080/api/transfer/confirm`;
		return this.http.post<any>(url, params)
	}

	getlistCheque(accountId: any): Observable<any> {
		const userId = sessionStorage.getItem('userId');
		let url;
			url = API_USERS_URL + userId + '/accounts/' + accountId + '/cheques';
		const userToken = sessionStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<any>(url, {headers: httpHeaders})
	}

	createSec(params,userId, id): Observable<any> {
		let url = API_USERS_URL + userId + '/accounts/' + id + '/cheques';
		return this.http.post<any>(url, params)
	}

	deleteSec(userId, accId, id) : Observable<any> {
		let url = API_USERS_URL + userId + '/accounts/' + accId + '/cheques/' + id + '/cancel';
		return this.http.get<any>(url)
	}
}
