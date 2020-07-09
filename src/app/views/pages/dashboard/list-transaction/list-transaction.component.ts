import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LayoutUtilsService } from 'src/app/core/_base/crud';

@Component({
  selector: 'kt-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.scss'],
})
export class ListTransactionComponent implements OnInit {
  displayedColumns = ['id', 'amount', 'type', 'amountAfter', 'date', 'from', 'des'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  accountId: any;
  userForm: FormGroup;
  account: any = [];
  dataSource$: Observable<any>;
  pageEvent: PageEvent;
  stk;
  userId;
  id;
  private subscriptions: Subscription[] = [];
  constructor(
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private layoutUtilsService: LayoutUtilsService,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      stk: ['12312312300'],
      acc: [''],
    });
    this.userForm.get('stk').valueChanges.subscribe((val) => {
      if (val.length == 12) {
        this.searchUser(val);
      }
    });
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

  searchUser(id) {
    const params = {
      term: id,
      type: 'IDCARDNUMBER',
    };
    this.userProfileService.getUser(params).subscribe(
      (val: any) => {
        this.getAccount(val.id)
        this.userId = val.id
      },
      (err) => {
        const message = this.translate.instant('NOT_FIND_USER');
        this.layoutUtilsService.showActionNotification(message);
      },
    );
  }

  getAccount(userId) {
    this.userService.getAccountUser(userId).subscribe((val) => {
      this.account = val;
    });
  }

  change(event) {
    this.id = event.id;
    this.dataSource$ = this.exchangeService.getTransactionUser(this.userId, event.id);
  }
  setItems(event) {
    const page = event.pageIndex + 1;
    this.dataSource$ = this.exchangeService.getTransactionUser(this.userId, this.id, page);
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
  getDate(date) {
    return moment(date).format('YYYY/MM/DD HH:mm');
  }
}
