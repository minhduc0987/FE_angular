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
import {PageEvent} from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
// @ts-ignore
import moment from 'moment';

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
  displayedColumns = ['id', 'amount', 'type', 'amountAfter', 'date', 'from','des'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  accountId: any;
  nams = [{value: 'Tất cả'},{value: '2010'}, {value: '2011'}, {value: '2012'}, {value: '2013'}, {value: '2014'}, {value: '2015'}, {value: '2016'}, {value: '2017'}, {value: '2018'}, {value: '2019'}, {value: '2020'}]
  thangs = [{value: 'Tất cả'},{value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'}, {value: '8'}, {value: '9'}, {value: '10'}, {value: '11'}, {value: '12'}]
  nam;
  thang;
  account$: Observable<any>;
  dataSource$: Observable<any>;
  pageEvent: PageEvent;
  stk;
  id;
  private subscriptions: Subscription[] = [];
  constructor(
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getAccount();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  async loadListAccount() {

  }
  getType(amount) {
    if (Number(amount) > 0) {
      return 'Nhận'
    }
    return 'Chuyển'
  }

  getAccount() {
    const userId = localStorage.getItem('userId')
    this.account$ = this.userService.getListAccount(userId);
  }

  change(event) {
    this.id = event.id
    const param = {
      id: event.id,
      nam : this.nam == 'Tất cả' ? undefined : this.nam,
      thang: this.thang == 'Tất cả' ? undefined : this.thang
    }
    this.dataSource$ = this.exchangeService.getlistExchange(param);
  }
  setItems(event) {
    const page = event.pageIndex + 1;
    const param = {
      id: this.id,
      nam : this.nam == 'Tất cả' ? undefined : this.nam,
      thang: this.thang == 'Tất cả' ? undefined : this.thang
    }
    this.dataSource$ = this.exchangeService.getlistExchange(param, page);
  }
  getAmount(n) {
    if(n && typeof n === 'number') {
      return this.formatNumber(Math.abs(n));
    }
  }
  formatNumber(n: any) {
    if (n !== null) {
      return n
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  getDate(date) {
    return moment(date).format('YYYY/MM/DD HH:mm');
  }
}
