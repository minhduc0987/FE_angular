import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_USERS_URL = environment.urlBE + 'api/users/';

@Injectable({providedIn: 'root'})
export class ExchangeService {

	constructor(private http: HttpClient) {
	}

	getlistExchange(accountId: any): Observable<any> {
		const userId = localStorage.getItem('userId');
        const url = API_USERS_URL + userId + '/accounts/' + accountId + '/transactions';
		const userToken = localStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<any>(url, {headers: httpHeaders})
	}

	getUserExchange(params: any): Observable<any> {
        const url = API_USERS_URL + 'find';
		const userToken = localStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.post<any>(url, params)
	}

	exchange(params, id) {
		const url = `http://localhost:8080/api/users/1/accounts/`+ id +`/tranferInternal/accountNumber`;
		return this.http.post<any>(url, params)
	}
}
