// NGRX
import { createSelector, createFeatureSelector, select } from '@ngrx/store';
// Models

import { UserProfileState } from '../_reducers/user-profile.reducers';
import { HttpExtenstionsModel, QueryResultsModel } from '../../_base/crud';
import { each } from 'lodash';

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
    usersState => {
        const items: any[] = [];
        each(usersState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: any[] = httpExtension.sortArray(items, usersState.lastQuery.sortField, usersState.lastQuery.sortOrder);
        return new QueryResultsModel(result, usersState.totalCount, '');
    }
);

export const isLoadErrorListAccount = createSelector(
	selectUserProfileState,
	up => up._isErrorGetListAccounts
);

