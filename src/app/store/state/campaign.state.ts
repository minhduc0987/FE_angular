

export interface CampaignState {
    campaignList: any | null;
    campaignListHome: any | null;
    error: any;
  }

  export const CampaignInitialState: CampaignState = {
      campaignList: null,
      campaignListHome: null,
      error: null,
  };
