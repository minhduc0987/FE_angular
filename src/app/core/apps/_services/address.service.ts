import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ward, Province, District } from '../_models/address.model';
import { environment } from '../../../../environments/environment';

const API_ADDRESS_PROVINCE_URL = environment + 'common/province';
const API_ADDRESS_DISTRICT_URL = environment + 'common/district/';
const API_ADDRESS_WARD_URL = environment + 'common/ward/';


@Injectable()
export class AddressService {
	constructor(private http: HttpClient) { }

	getProvince(): Observable<Province[]> {
		return this.http.get<Province[]>(API_ADDRESS_PROVINCE_URL);
	}

	getDistrictByProvinceId(provinceId: number): Observable<District[]> {
		return this.http.get<District[]>(API_ADDRESS_DISTRICT_URL + provinceId);
	}
	getWardByDistrictId(districtId: number): Observable<Ward[]> {
		return this.http.get<Ward[]>(API_ADDRESS_WARD_URL + districtId);
	}

}
