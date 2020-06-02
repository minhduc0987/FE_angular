import {
    CampaignActions,
    CampaignActionTypes
} from '../actions/campaign.actions';
import { CampaignState, CampaignInitialState } from '../state/campaign.state';

export function campaignReducer(
    state = CampaignInitialState,
    action: CampaignActions
): CampaignState {
    switch (action.type) {
        case CampaignActionTypes.CampaignListLoadSuccess: {
            return Object.assign({}, state, {
                campaignList: action.payload.campaignList
            });
        }

        case CampaignActionTypes.CampaignListFail: {
            return Object.assign({}, state, {
                error: action.payload.error
            });
        }

        case CampaignActionTypes.CampaignHomeLoadSuccess: {
            return Object.assign({}, state, {
                campaignListHome: action.payload.campaignListHome
            });
        }

        case CampaignActionTypes.CampaignHomeLoadFail: {
            return Object.assign({}, state, {
                error: action.payload.error
            });
        }

        default:
            return state;
    }
}
