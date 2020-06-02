import { Action } from '@ngrx/store';
import { Province, District, Ward } from '../_models/address.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum AddressActionTypes {
	ProvinceRequested = '[Address] Province Requested',
	ProvinceLoaded = '[Address] Province Loaded',
	DistrictRequested = '[Address] District Requested',
	DistrictRequestedSuccess = '[Address] District Requested Success',
	WardRequested = '[Address] Ward Requested',
	WardRequestedSuccess = '[Address] Ward Requested Success',
	AddressRequestedFailed = '[Address] Address Requested Failed',

}

// Province
export class ProvinceRequested implements Action {
	readonly type = AddressActionTypes.ProvinceRequested;
}

export class ProvinceLoaded implements Action {
	readonly type = AddressActionTypes.ProvinceLoaded;
	constructor(public payload: { provinceList: Province[] }) { }
}

export class AddressRequestedFailed implements Action {
	readonly type = AddressActionTypes.AddressRequestedFailed;
	constructor(public payload: { err: HttpErrorResponse }) { }
}

// District
export class DistrictRequested implements Action {
	readonly type = AddressActionTypes.DistrictRequested;
	constructor(public payload: { provinceId: number }) { }
}

export class DistrictRequestedSuccess implements Action {
	readonly type = AddressActionTypes.DistrictRequestedSuccess;
	constructor(public payload: { districtList: District[] }) { }
}

// Ward
export class WardRequested implements Action {
	readonly type = AddressActionTypes.WardRequested;
	constructor(public payload: { districtId: number }) { }
}

export class WardRequestedSuccess implements Action {
	readonly type = AddressActionTypes.WardRequestedSuccess;
	constructor(public payload: { wardList: Ward[] }) { }
}



export type AddressActions = ProvinceRequested
	| ProvinceLoaded
	| AddressRequestedFailed
	| DistrictRequested
	| DistrictRequestedSuccess
	| WardRequested
	| WardRequestedSuccess;
