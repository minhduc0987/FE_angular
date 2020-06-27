// NGRX
import { createSelector, createFeatureSelector, select } from '@ngrx/store';
// Models

import { UserProfileState } from '../_reducers/user-profile.reducers';

export const selectUserProfileState = createFeatureSelector<UserProfileState>('userProfile');


export const isUserProfileLoaded = createSelector(
	selectUserProfileState,
	up => up._isUserProfileLoaded
);

export const currentUserProfile = createSelector(
	selectUserProfileState,
	up => up.userProfile
);

export const isUserProfileError = createSelector(
	selectUserProfileState,
	up => up._isError
);

export const isLoadedListAccounts = createSelector(
	selectUserProfileState,
	up => up._isHasListAccounts
);

export const listAccounts = createSelector(
	selectUserProfileState,
	up => up.listAccounts
);

export const isLoadErrorListAccount = createSelector(
	selectUserProfileState,
	up => up._isErrorGetListAccounts
);

