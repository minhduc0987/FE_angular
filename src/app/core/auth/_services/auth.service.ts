import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

const API_LOGIN_URL =  environment.urlBE + 'api/admin/auth/login';
const API_USERS_URL = environment.urlBE + 'api/users/current';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  // Authentication/Authorization
  login(usernameOrEmail: string, password: string): Observable<any> {
		return this.http.post<any>(API_LOGIN_URL, { usernameOrEmail, password });
  }

  getUserByToken(): Observable<any> {
    const userToken = sessionStorage.getItem(environment.authTokenKey);
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<any>(API_USERS_URL, {headers : httpHeaders})

  }

  register(user: any): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<any>(API_USERS_URL, user, {headers: httpHeaders})
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(err => {
          return null;
        })
      );
  }

  public requestPassword(email: string): Observable<any> {
    return this.http.get(API_USERS_URL + '/forgot?=' + email)
      .pipe(catchError(this.handleError('forgot-password', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
