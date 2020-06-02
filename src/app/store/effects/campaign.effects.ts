import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignActionTypes,
    // CampaignHomeLoad,
    CampaignHomeLoadSuccess,
    CampaignHomeFail,
    CampaignListLoad,
    CampaignListLoadSuccess,
    CampaignListFail
} from '../actions/campaign.actions';
import { exhaustMap } from 'rxjs/operators';
import { catchError, map } from 'rxjs/internal/operators';

@Injectable()
export class CampaignEffects {
    constructor(
        private actions$: Actions,
        private campaignService: CampaignService,
    ) { }

    @Effect()
    loadCampaignList$ = this.actions$.pipe(
        ofType(CampaignActionTypes.CampaignListLoad),
        exhaustMap((actions: CampaignListLoad) => {
            return this.campaignService.getCampaignList(actions.payload.pagination).pipe(
                map(data => new CampaignListLoadSuccess({campaignList: data})),
                catchError(err => of(new CampaignListFail({ error: err })))
            );
        }
        )
    );

    @Effect()
    loadCampaignHome$ = this.actions$.pipe(
        ofType(CampaignActionTypes.CampaignHomeLoad),
        exhaustMap(() => {
            return this.campaignService.getCampaignHome().pipe(
                map(data => new CampaignHomeLoadSuccess({campaignListHome: data})),
                catchError(err => of(new CampaignHomeFail({ error: err })))
            );
        }
        )
    );
}
