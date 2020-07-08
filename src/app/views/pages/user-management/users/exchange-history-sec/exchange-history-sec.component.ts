// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// @ts-ignore
import moment from 'moment';
// RXJS
import { Observable, Subscription } from 'rxjs';
// Services
import { QueryParamsModel, LayoutUtilsService } from '../../../../../core/_base/crud';
// Models
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
  selector: 'kt-exchange-history-sec',
  templateUrl: './exchange-history-sec.component.html',
  styleUrls: ['./exchange-history-sec.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeHistorySecComponent implements OnInit, OnDestroy {
  // Table fields
  displayedColumns = ['id', 'name', 'info', 'money', 'date1', 'date2', 'status1', 'status2'];
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
    private layoutUtilsService: LayoutUtilsService,
    private userService: UserProfileService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.getAccount();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  async loadListAccount() {}
  getType(amount) {
    if (Number(amount) > 0) {
      return 'Nhận';
    }
    return 'Chuyển';
  }

  getAccount() {
    const userId = localStorage.getItem('userId');
    this.account$ = this.userService.getListAccount(userId);
  }

  change(event) {
    this.id = event.id;
    this.dataSource$ = this.exchangeService.getlistCheque(event.id);
  }

  getDate(date) {
    return moment(date).format('YYYY/MM/DD HH:mm');
  }
  getAmount(n) {
    if (n && typeof n === 'number') {
      return this.formatNumber(Math.abs(n));
    }
  }
  formatNumber(n: any) {
    if (n !== null) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  getStatus(n) {
    if (n.canceled) {
      return 'Đã huỷ';
    }
    if (!n.status) {
      return 'Chưa rút';
    }
    return 'Đã rút';
  }

  getStatus2(n) {
    if (!n) {
      return true;
    }
    return false;
  }

  cancelSec(item) {
    const userId = localStorage.getItem('userId');
    const accId = this.id;
    const id = item.id;
    this.exchangeService.deleteSec(userId, accId, id).subscribe(
      (val) => {},
      (err)=> {
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message, 'danger');
        return;
      }
      );
  }
}
