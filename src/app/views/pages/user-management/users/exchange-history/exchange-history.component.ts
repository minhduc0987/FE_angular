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
import { SubheaderService } from '../../../../../core/_base/layout';
import { ListExchangeOnServer, UserProfileService, UserAccountRequested, listAccounts, ExchangeService } from 'src/app/core/apps';

// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
  selector: 'kt-exchange-history',
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeHistoryComponent implements OnInit, OnDestroy {
  // Table fields
  displayedColumns = ['id', 'amount', 'type', 'amountAfter', 'date'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  lastQuery: QueryParamsModel;
  // Selection
  selection = new SelectionModel<any>(true, []);
  accountId: any
  dataSource$: Observable<any>;
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
    private exchangeService: ExchangeService,
  ) {}
  ngOnInit() {
  }

  ngOnAfterInit() {
    this.dataSource$ = this.exchangeService.getlistExchange('1');
    this.dataSource$.subscribe(val => {
      console.log(val)
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  async loadListAccount() {
    const params = {
      accountId: '1'
    }

  }
  getType(amount) {
    if (Number(amount) > 0) {
      return 'cộng tiền'
    }
    return 'trừ tiền'
  }
}
