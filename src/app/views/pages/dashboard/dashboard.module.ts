// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from '../pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { InterceptService, HttpUtilsService, TypesUtilsService, LayoutUtilsService } from 'src/app/core/_base/crud';
import { ActionNotificationComponent, DeleteEntityDialogComponent } from '../../partials/content/crud';
import { Aside1Component } from './aside/aside-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListTransactionComponent } from './list-transaction/list-transaction.component';
import { ListHsvtComponent } from './list-hsvt/list-hsvt.component';
import { ListSecComponent } from './list-sec/list-sec.component';
import { TinTucComponent } from './tin-tuc/tin-tuc.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RutTienComponent } from './rut-tien/rut-tien.component';
import { GuiTienComponent } from './gui-tien/gui-tien.component';
import { CreateHsComponent } from './create-hs/create-hs.component';
import { ListVayTienComponent } from './list-vay-tien/list-vay-tien.component';
import { DepositComponent } from './deposit/deposit.component';
import { PageComponent } from './page/page.component';
import { UserComponent } from './user/user.component';
import { HsvtComponent } from './hsvt/hsvt.component';
import { InpitOtpComponent } from '../../partials/content/crud/inpit-otp/inpit-otp.component';
import { RutSecComponent } from './rut-sec/rut-sec.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'list-user',
        pathMatch: 'full',
      },
      {
        path: 'list-user',
        component: ListUserComponent,
      },
      {
        path: 'list-transaction',
        component: ListTransactionComponent,
      },
      {
        path: 'list-sec',
        component: ListSecComponent,
      },
      {
        path: 'list-hsvt',
        component: ListVayTienComponent,
      },
      {
        path: 'rut-tien',
        component: RutTienComponent,
      },
      {
        path: 'rut-sec',
        component: ListSecComponent,
      },
      {
        path: 'add-money',
        component: GuiTienComponent,
      },
      {
        path: 'create-loan',
        component: CreateHsComponent,
      },
      {
        path: 'loans',
        component: ListVayTienComponent,
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
  entryComponents: [ActionNotificationComponent, DeleteEntityDialogComponent, UserComponent, HsvtComponent, InpitOtpComponent],
  declarations: [
    DashboardComponent,
    Aside1Component,
    ListUserComponent,
    ListTransactionComponent,
    ListHsvtComponent,
    ListSecComponent,
    TinTucComponent,
    AboutComponent,
    ContactComponent,
    RutTienComponent,
    GuiTienComponent,
    CreateHsComponent,
    ListVayTienComponent,
    DepositComponent,
    PageComponent,
    UserComponent,
    HsvtComponent,
    RutSecComponent,
  ],
})
export class DashboardModule {}
