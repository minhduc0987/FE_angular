// NGRX
import { createSelector, createFeatureSelector, select } from '@ngrx/store';
// Models

import { ExchangeState } from '../_reducers/exchange.reducers';

export const selectExchangeState = createFeatureSelector<ExchangeState>('exchange');


export const isExchangeLoaded = createSelector(
	selectExchangeState,
	up => up.listExchange
);

export const isExchangeError = createSelector(
	selectExchangeState,
	up => up._isError
);
