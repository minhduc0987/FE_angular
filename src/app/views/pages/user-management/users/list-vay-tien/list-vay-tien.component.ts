import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-list-vay-tien',
  templateUrl: './list-vay-tien.component.html',
  styleUrls: ['./list-vay-tien.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListVayTienComponent implements OnInit {
  // Table fields
  displayedColumns = ['id', 'amount', 'date', 'lai', 'date2', 'tstc', 'status', 'description'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource$: Observable<any>;
  private subscriptions: Subscription[] = [];
  constructor(
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource$ = this.exchangeService.getListVay();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
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
    switch(e.status) {
      case '0' : 
        return 'Chưa xác nhận'
      case '1' : 
        return 'Chờ xác minh'
      case '2' : 
        return 'Chờ xem xét'
      case '3' : 
        return 'Chờ phê duyệt'
      case '4' : 
        return 'Đã phê duyệt'
    }
  }
  createHsvt() {
    this.router.navigateByUrl('/user-detail/vay-tien')
  }
}
