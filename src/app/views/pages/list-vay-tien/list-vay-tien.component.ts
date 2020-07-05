import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-list-vay-tien',
  templateUrl: './list-vay-tien.component.html',
  styleUrls: ['./list-vay-tien.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListVayTienComponent implements OnInit {
  // Table fields
  displayedColumns = ['id', 'amount', 'date', 'lai','date2','tstc', 'status', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  accountId: any;
  account$: Observable<any>;
  dataSource$: Observable<any>;
  pageEvent: PageEvent;
  stk;
  id;
  private subscriptions: Subscription[] = [];
  constructor(
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private translate: TranslateService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit() {
     this.getListLoans();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  getListLoans() {
    const user = JSON.parse(sessionStorage.getItem('userSearch'));
    this.exchangeService.getListLoan(user.id).subscribe(val=> {
      this.dataSource$ = val;
      this.ref.markForCheck();
    })
  }

  getAmount(n) {
    return this.formatNumber(n);
  }

  formatNumber(n: any) {
    if (n !== null) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  getStatus(e) {
    return 'Chờ'
  }
}
