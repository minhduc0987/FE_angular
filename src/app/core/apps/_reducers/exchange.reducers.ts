// Actions
import { ExchangeAction, ExchangeActionTypes, ExchangeOnError, ListExchangeOnServer } from '../_actions/exchange.action';
// Models
export interface ExchangeState {
	listExchange: any;
	_isLoading: boolean;
	_isError: any;
}

export const initiaExchangeState: ExchangeState = {
	listExchange: undefined,
	_isLoading: false,
	_isError: undefined,
};

export function exchangeReducer(state = initiaExchangeState, action: ExchangeAction): ExchangeState {
	switch (action.type) {
		case ExchangeActionTypes.ListExchangeOnServer:
			return {
				...state,
				listExchange: action.payload,
				_isLoading: true,
				_isError: undefined
			};

		case ExchangeActionTypes.ExchangeOnError:
			return {
				...state,
				listExchange: [],
				_isLoading: false,
				_isError: action.payload.err
			};

		default:
			return state;
	}
}
