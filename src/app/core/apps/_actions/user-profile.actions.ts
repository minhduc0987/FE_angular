// NGRX
import { Action } from '@ngrx/store';
// CRUD
import { UserProfile } from '../_models/user-profile.model';
// Models

export enum UserProfileActionTypes {
	UserProfileRequested = '[User Profile] User Profile Requested ',
	UserProfileLoaded = '[User Profile] User Profile Loaded ',
	UserProfileCatchError = '[User Profile] HTTP Request Error',

	UserAccountRequested = '[User Account] UserAccountRequested ',
	UserAccountLoaded = '[User Account] UserAccountLoaded ',
	UserAccountError = '[User Account] UserAccountError',
}

export class UserProfileRequested implements Action {
	readonly type = UserProfileActionTypes.UserProfileRequested;
}

export class UserProfileLoaded implements Action {
	readonly type = UserProfileActionTypes.UserProfileLoaded;
	constructor(public payload: { userProfile: any }) { }
}

export class UserProfileCatchError implements Action {
	readonly type = UserProfileActionTypes.UserProfileCatchError;
	constructor(public payload: { isError: any }) { }
}

export class UserAccountRequested implements Action {
	readonly type = UserProfileActionTypes.UserAccountRequested;
	constructor(public payload: { userId: string }) { }
}

export class UserAccountLoaded implements Action {
	readonly type = UserProfileActionTypes.UserAccountLoaded;
	constructor(public payload: { listAccounts: any }) { }
}

export class UserAccountError implements Action {
	readonly type = UserProfileActionTypes.UserAccountError;
	constructor(public payload: { isError: any }) { }
}


export type UserProfileActions = UserProfileRequested
	| UserProfileLoaded
	| UserProfileCatchError
	| UserAccountRequested
	| UserAccountLoaded
	| UserAccountError
	;
