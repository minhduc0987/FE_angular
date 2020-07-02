// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// RXJS
import { Observable, Subscription } from 'rxjs';
// Services
import { QueryParamsModel } from '../../../../../core/_base/crud';
// Models
import { ExchangeService, UserProfileService } from 'src/app/core/apps';

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
  account$: Observable<any>;
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
    private userService: UserProfileService,
  ) {}

  ngOnInit() {
    this.dataSource$ = this.exchangeService.getlistExchange('1');
    this.getAccount()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  async loadListAccount() {

  }
  getType(amount) {
    if (Number(amount) > 0) {
      return 'cộng tiền'
    }
    return 'trừ tiền'
  }

  getAccount() {
    const userId = localStorage.getItem('userId')
    this.account$ = this.userService.getListAccount(userId);
  }
}
