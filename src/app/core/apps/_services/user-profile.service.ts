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

@Injectable({providedIn: 'root'})
export class UserProfileService {

	constructor(private http: HttpClient) {
	}

	getUserProfile(): Observable<User> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<User>(API_USERS_INFO_URL, {headers : httpHeaders})
	}
}
