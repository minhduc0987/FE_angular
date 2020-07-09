import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'kt-notice-exchange',
  templateUrl: './notice-exchange.component.html',
  styleUrls: ['./notice-exchange.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeExchangeComponent implements OnInit {
  displayedColumns = ['id', 'content','date'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = [];
  private subscriptions: Subscription[] = [];
  constructor(
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private ref: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.exchangeService.getNoticelist().subscribe(
      val=> {this.dataSource = val;this.ref.markForCheck()},
      val=> {},
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  getDate(n) {
    return moment(n).format('YYYY/MM/DD hh:mm:ss')
  }
 
  setItems(event) {
    const page = event.pageIndex + 1;
    this.exchangeService.getNoticelist(page).subscribe(
      val=> {this.dataSource = val;this.ref.markForCheck()},
      val=> {},
    );
  }
 
}
