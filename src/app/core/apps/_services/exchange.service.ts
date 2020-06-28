import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../auth';
import { QueryParamsModel } from '../../_base/crud';

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
}
