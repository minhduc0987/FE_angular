import { Action } from '@ngrx/store';

export enum CampaignActionTypes {
    CampaignListLoad = '[Campaign List] Load',
    CampaignListLoadSuccess = '[Campaign List] Load SUCCESS',
    CampaignListFail = '[Campaign List] Load Fail',
    CampaignHomeLoad = '[Campaign Home] Load',
    CampaignHomeLoadSuccess = '[Campaign Home] Load Success',
    CampaignHomeLoadFail = '[Campaign Home] Load Fail'
}

export class CampaignListLoad implements Action {
    readonly type = CampaignActionTypes.CampaignListLoad;
    constructor(public payload: { pagination: any }) { }
}

export class CampaignListLoadSuccess implements Action {
    readonly type = CampaignActionTypes.CampaignListLoadSuccess;
    constructor(public payload: { campaignList: any }) { }
}

export class CampaignListFail implements Action {
    readonly type = CampaignActionTypes.CampaignListFail;
    constructor(public payload: { error: any }) { }
}

export class CampaignHomeLoad implements Action {
    readonly type = CampaignActionTypes.CampaignHomeLoad;
}

export class CampaignHomeLoadSuccess implements Action {
    readonly type = CampaignActionTypes.CampaignHomeLoadSuccess;
    constructor(public payload: { campaignListHome: any }) { }
}

export class CampaignHomeFail implements Action {
    readonly type = CampaignActionTypes.CampaignHomeLoadFail;
    constructor(public payload: { error: any }) { }
}

export type CampaignActions =
    | CampaignListLoad
    | CampaignListLoadSuccess
    | CampaignListFail
    | CampaignHomeLoad
    | CampaignHomeFail
    | CampaignHomeLoadSuccess;
