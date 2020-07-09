import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserProfile } from '../_models/user-profile.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { filter, some, find, each } from 'lodash';
import { User } from '../../auth';

const API_USERS_INFO_URL = environment.urlBE + 'api/users/current';
const API_USERS_URL = environment.urlBE + 'api/users';

@Injectable({providedIn: 'root'})
export class UserProfileService {
  createUser(param: { username: any; email: any; fullName: any; birthday: any; address: any; gender: any; idCardNumber: any; phone: any; image: any; membershipId: any; }) {
    throw new Error("Method not implemented.");
  }
  lock(id: any) {
    throw new Error("Method not implemented.");
  }

	constructor(private http: HttpClient) {
	}

	getUserProfile(): Observable<User> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<User>(API_USERS_INFO_URL, {headers : httpHeaders})
	}

	getListAccount(userId): Observable<any> {
		const url = API_USERS_URL + '/' + userId + '/accounts';
		const userToken = localStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<User>(url, {headers : httpHeaders})
	}

	getListAccountExchange(userId): Observable<any> {
		const url = API_USERS_URL + '/' + userId + '/useableAccounts';
		const userToken = localStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<User>(url, {headers : httpHeaders})
	}
	lockAccount(param): Observable<any> {
		const uri = environment.urlBE + `api/users/current/account/lock`;
		return this.http.post(uri,param);
	  }
}
