import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CampaignState } from '../state/campaign.state';

export const getCampaignState = createFeatureSelector<CampaignState>(
  'campaign'
);

export const getCampaignList = createSelector(
    getCampaignState,
    state => state.campaignList
);

export const getCampaignHome = createSelector(
    getCampaignState,
    state => state.campaignListHome
);

export const getCampaignListFail  = createSelector(
    getCampaignState,
    state => state.error
);
