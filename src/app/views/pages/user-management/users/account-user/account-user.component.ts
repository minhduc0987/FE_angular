// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
// LODASH
import { each, find } from 'lodash';
// NGRX
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';

// Services
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
// Models
import {
} from '../../../../../core/auth';
import { SubheaderService } from '../../../../../core/_base/layout';
import { ListExchangeOnServer, UserProfileService, UserAccountRequested, listAccounts } from 'src/app/core/apps';

// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
  selector: 'kt-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountUserComponent implements OnInit, OnDestroy {
  // Table fields
  dataSource$: Observable<any>;
  displayedColumns = ['id', 'accountNumber', 'card', 'amount', 'member'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  lastQuery: QueryParamsModel;
  // Selection
  selection = new SelectionModel<any>(true, []);
  accountId: any
  // Subscriptions
  private subscriptions: Subscription[] = [];

  /**
   *
   * @param activatedRoute: ActivatedRoute
   * @param store: Store<AppState>
   * @param router: Router
   * @param layoutUtilsService: LayoutUtilsService
   * @param subheaderService: SubheaderService
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private subheaderService: SubheaderService,
    private cdr: ChangeDetectorRef,
    private userService: UserProfileService
  ) {}
  ngOnInit() {
    this.loadListAccount()
  }
  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
  loadUsersList() {
  }
  loadListAccount() {
    this.dataSource$ = this.userService.getListAccount('1');
  }
  getAmount(amount) {
    return amount + ' VNĐ' ;
  }
  getMember() {
    const u = JSON.parse(localStorage.getItem('user'));
    return u.membership.name;
  }
  getClass() {
    switch(this.getMember()) {
      case 'GOLD' :
        return 'gold';
      default :
        return 'gold';
    }
  }
}
