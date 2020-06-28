// Angular
import { Injectable } from '@angular/core';
// RxJS
import { switchMap, map, tap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
// User Profile Action
import {
	UserProfileLoaded,
	UserProfileActionTypes,
	UserProfileRequested,
	UserProfileCatchError,
	UserAccountLoaded,
	UserAccountError
} from '../_actions/user-profile.actions';

import { UserProfileService } from '../_services/user-profile.service';
import { AppState } from '../../reducers';
import { isUserProfileLoaded } from '../_selectors/user-profile.selectors';
import { LayoutUtilsService } from '../../_base/crud';
import { TranslateService } from '@ngx-translate/core';
import { Logout } from '../../auth';

//@ts-ignore
@Injectable()
export class UserProfileEffects {

	@Effect()
	loadUserProfile$ = this.actions$
		.pipe(
			ofType<UserProfileRequested>(UserProfileActionTypes.UserProfileRequested),
			switchMap(() => this.userProfileService.getUserProfile().pipe(
				map(result => {
					return new UserProfileLoaded({ userProfile: result });
				}),
				catchError(err => {
					this.store.dispatch(new Logout());
					return of(new UserProfileCatchError({ isError: err }));
				})
			))
		);

	@Effect()
	loadAccountUser$ = this.actions$
		.pipe(
			ofType<UserProfileRequested>(UserProfileActionTypes.UserAccountRequested),
			switchMap((userId) => this.userProfileService.getListAccount(userId).pipe(
				map(result => {
					return new UserAccountLoaded({ listAccounts: result });
				}),
				catchError(err => {
					this.store.dispatch(new Logout());
					return of(new UserAccountError({ isError: err }));
				})
			))
		);

	constructor(
		private actions$: Actions,
		private userProfileService: UserProfileService,
		private store: Store<AppState>,
		private layoutUtilsService: LayoutUtilsService,
		private translateService: TranslateService) {

	}


}
