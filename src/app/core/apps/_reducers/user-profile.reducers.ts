// Actions
import { UserProfileActions, UserProfileActionTypes } from '../_actions/user-profile.actions';
// Models
import { UserProfile } from '../_models/user-profile.model';

export interface UserProfileState {
	[x: string]: any;
	userProfile: UserProfile;
	_isUserProfileLoaded: boolean;
	_isLoading: boolean;
	_isError: any;
	listAccounts: any;
	_isHasListAccounts: boolean;
	_isErrorGetListAccounts: any;
}

export const initialUserProfileState: UserProfileState = {
	userProfile: undefined,
	_isUserProfileLoaded: false,
	_isLoading: false,
	_isError: undefined,
	listAccounts: undefined,
	_isHasListAccounts: false,
	_isErrorGetListAccounts: undefined
};

export function UserProfileReducer(state = initialUserProfileState, action: UserProfileActions): UserProfileState {
	switch (action.type) {
		case UserProfileActionTypes.UserProfileRequested:
			return {
				...state,
				_isUserProfileLoaded: false,
			};

		case UserProfileActionTypes.UserProfileLoaded:
			return {
				...state,
				userProfile: action.payload.userProfile,
				_isUserProfileLoaded: true,
			};

		case UserProfileActionTypes.UserProfileCatchError:
			return {
				...state,
				_isError: action.payload.isError,
			};
		case UserProfileActionTypes.UserAccountRequested:
			return {
				...state,
				_isHasListAccounts: false,
				listAccounts: undefined
			};
		case UserProfileActionTypes.UserAccountLoaded:
			return {
				...state,
				listAccounts: action.payload.listAccounts,
				_isHasListAccounts: true,
			};
		case UserProfileActionTypes.UserAccountError:
			return {
				...state,
				_isErrorGetListAccounts: action.payload.isError,
			};
		default:
			return state;
	}
}
