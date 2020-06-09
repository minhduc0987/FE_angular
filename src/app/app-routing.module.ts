// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'desk-manager',
        loadChildren: () => import('./views/pages/desk-manager/desk-manager.module').then(m => m.DeskManagerModule),
      },
      {
        path: 'event-manager',
        loadChildren: () => import('./views/pages/event-manager/event-manager.module').then(m => m.EventManagerModule),
      },
      {
        path: 'menu-manager',
        loadChildren: () => import('./views/pages/menu-manager/menu-manager.module').then(m => m.MenuManagerModule),
      },
      {
        path: 'human-resoucer-manager',
        loadChildren: () => import('./views/pages/human-resource/human-resource.module').then(m => m.HumanResourceModule),
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
