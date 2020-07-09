// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth';
import { AboutComponent } from './views/pages/about/about.component';
import { TinTucComponent } from './views/pages/tin-tuc/tin-tuc.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { NoticeExchangeComponent } from './views/pages/notice-exchange/notice-exchange.component';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'user-detail',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/user-management/user-management.module').then(m => m.UserManagementModule),
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'tin-tuc',
        component: TinTucComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'builder',
        loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule),
      },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
