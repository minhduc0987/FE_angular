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
  User,
  UsersDataSource,
  UsersPageRequested,
} from '../../../../../core/auth';
import { SubheaderService } from '../../../../../core/_base/layout';
import { ListExchangeOnServer } from 'src/app/core/apps';

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
  dataSource: UsersDataSource;
  displayedColumns = ['id', 'username', 'email', 'fullname', '_roles', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  lastQuery: QueryParamsModel;
  // Selection
  selection = new SelectionModel<User>(true, []);
  usersResult: any[] = [];

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
  ) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.subscriptions.push(sortSubscription);
    const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadUsersList();
        }),
      )
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
    const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // tslint:disable-next-line:max-line-length
        debounceTime(150), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
        distinctUntilChanged(), // This operator will eliminate duplicate values
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadUsersList();
        }),
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    // Init DataSource
    this.dataSource = new UsersDataSource(this.store);
    const entitiesSubscription = this.dataSource.entitySubject.pipe(skip(1), distinctUntilChanged()).subscribe((res) => {
      this.usersResult = res;
    });
    this.subscriptions.push(entitiesSubscription);

    // First Load
    of(undefined)
      .pipe(take(1), delay(1000))
      .subscribe(() => {
        // Remove this line, just loading imitation
        this.loadUsersList();
      });
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  /**
   * Load users list
   */
  loadUsersList() {
    this.selection.clear();
    const queryParams = new QueryParamsModel(
      {id : '1'},
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
    this.store.dispatch(new ListExchangeOnServer({ data: queryParams }));
    this.selection.clear();
  }
}
