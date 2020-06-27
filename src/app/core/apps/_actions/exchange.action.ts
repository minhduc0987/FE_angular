// NGRX
import { Action } from '@ngrx/store';
import { QueryParamsModel } from '../../_base/crud';

export enum ExchangeActionTypes {
	ListExchangeOnServer = '[List Exchange On Server] List Exchange On Server',
	ExchangeOnError = '[Exchange On Error] Exchange On Error',
}

export class ListExchangeOnServer implements Action {
	readonly type = ExchangeActionTypes.ListExchangeOnServer;
	constructor(public payload: { data: any }) { }
}

export class ExchangeOnError implements Action {
	readonly type = ExchangeActionTypes.ExchangeOnError;
	constructor(public payload: { err: any }) { }
}

export type ExchangeAction = ListExchangeOnServer | ExchangeOnError
