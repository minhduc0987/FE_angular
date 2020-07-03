// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// NGRX
// Translate
import { TranslateModule } from '@ngx-translate/core';
import { PartialsModule } from '../../partials/partials.module';
// Services
import { HttpUtilsService, TypesUtilsService, InterceptService, LayoutUtilsService } from '../../../core/_base/crud';
// Shared
import { ActionNotificationComponent } from '../../partials/content/crud';
// Components
import { UserManagementComponent } from './user-management.component';
import { UserInfoComponent } from './users/user-info/user-info.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { AsideUserComponent } from './aside-user/aside-user.component';
import { ExchangeInComponent } from './users/exchange-in/exchange-in.component';
import { ExchangeOutComponent } from './users/exchange-out/exchange-out.component';
import { ExchangeHistoryComponent } from './users/exchange-history/exchange-history.component';
import { FastExchangeComponent } from './users/fast-exchange/fast-exchange.component';
import { AccountUserComponent } from './users/account-user/account-user.component';
import {} from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateComponent } from './users/update/update.component';
import { ExchangeHistorySecComponent } from './users/exchange-history-sec/exchange-history-sec.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'thong-tin',
        pathMatch: 'full',
      },
      {
        path: 'thong-tin',
        component: UserInfoComponent,
      },
      {
        path: 'accounts',
        component: AccountUserComponent,
      },
      {
        path: 'exchange-sec',
        component: ExchangeInComponent,
      },
      {
        path: 'exchange-sec-history',
        component: ExchangeHistorySecComponent,
      },
      {
        path: 'exchange-otp',
        component: ExchangeOutComponent,
      },
      {
        path: 'vay-tien',
        component: FastExchangeComponent,
      },
      {
        path: 'lich-su-giao-dich',
        component: ExchangeHistoryComponent,
      },
      {
        path: 'update',
        component: UpdateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PartialsModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatStepperModule,
    NgSelectModule,
  ],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'kt-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px',
      },
    },
    HttpUtilsService,
    TypesUtilsService,
    LayoutUtilsService,
  ],
  entryComponents: [ActionNotificationComponent, AsideUserComponent],
  declarations: [
    UserManagementComponent,
    UserInfoComponent,
    AsideUserComponent,
    ExchangeInComponent,
    ExchangeOutComponent,
    ExchangeHistoryComponent,
    FastExchangeComponent,
    AccountUserComponent,
	UpdateComponent,
	ExchangeHistorySecComponent
  ],
})
export class UserManagementModule {}
