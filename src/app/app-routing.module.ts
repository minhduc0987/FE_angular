// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth';
import { RutTienComponent } from './views/pages/rut-tien/rut-tien.component';
import { GuiTienComponent } from './views/pages/gui-tien/gui-tien.component';
import { CreateHsComponent } from './views/pages/create-hs/create-hs.component';
import { ListVayTienComponent } from './views/pages/list-vay-tien/list-vay-tien.component';

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
        path: 'rut-tien',
        component: RutTienComponent,
      },
      {
        path: 'gui-tien',
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
