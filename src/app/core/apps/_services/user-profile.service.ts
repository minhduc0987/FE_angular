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

	constructor(private http: HttpClient) {
	}

	getUserProfile(): Observable<User> {
		const userToken = sessionStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<User>(API_USERS_INFO_URL, {headers : httpHeaders})
	}

	getListAccount(userId): Observable<any> {
		const url = API_USERS_URL + '/' + userId + '/accounts';
		const userToken = sessionStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<User>(url, {headers : httpHeaders})
	}

	getUser(params): Observable<any> {
		const url = environment.urlBE + 'api/admin/user/find'
		return this.http.post<any>(url, params)
	}

	lock(id): Observable<User> {
		const url = environment.urlBE + 'api/admin/user/lock'
		return this.http.post<User>(url, id)
	}

	unlock(id): Observable<User> {
		const url = environment.urlBE + 'api/admin/user/unlock'
		return this.http.post<User>(url, id)
	}

	guitien(param): Observable<User> {
		const url = environment.urlBE + 'api/admin/account/deposit'
		return this.http.post<User>(url, param)
	}

	ruttien(param): Observable<User> {
		const url = environment.urlBE + 'api/admin/account/withdraw'
		return this.http.post<User>(url, param)
	}

	createUser(param): Observable<User> {
		const url = environment.urlBE + 'api/admin/user/register'
		return this.http.post<User>(url, param)
	}
}
