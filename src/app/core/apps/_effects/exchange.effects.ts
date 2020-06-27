// Angular
import { Injectable } from '@angular/core';
// RxJS
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import {  Store } from '@ngrx/store';
import {
	ExchangeAction, ExchangeActionTypes, ListExchangeOnServer, ExchangeOnError
} from '../_actions/exchange.action';
import { AppState } from '../../reducers';
import { LayoutUtilsService } from '../../_base/crud';
import { TranslateService } from '@ngx-translate/core';
import { ExchangeService } from '../_services';
//@ts-ignore
@Injectable()
export class ExchangeEffects {

	@Effect()
	loadListExchange$ = this.actions$
		.pipe(
			ofType<ExchangeAction>(ExchangeActionTypes.ListExchangeOnServer),
			switchMap((payload) => this.exchangeService.getlistExchange(payload).pipe(
				map(result => {
					// return new ListExchangeOnServer({ data: result });
				}),
				catchError(err => {
					return of(new ExchangeOnError({ err }));
				})
			))
		);

	constructor(
		private actions$: Actions,
		private exchangeService: ExchangeService,
		private store: Store<AppState>,
		private layoutUtilsService: LayoutUtilsService,
		private translateService: TranslateService) {

	}


}
