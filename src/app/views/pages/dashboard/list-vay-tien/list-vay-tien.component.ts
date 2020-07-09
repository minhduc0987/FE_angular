import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HsvtComponent } from '../hsvt/hsvt.component';

@Component({
  selector: 'kt-list-vay-tien',
  templateUrl: './list-vay-tien.component.html',
  styleUrls: ['./list-vay-tien.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListVayTienComponent implements OnInit {
  // Table fields
  displayedColumns = ['id', 'amount', 'date', 'lai', 'date2', 'tstc', 'status', 'description' , 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  accountId: any;
  dataSource: any = [];
  pageEvent: PageEvent;
  stk;
  id;
  private subscriptions: Subscription[] = [];
  constructor(
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private translate: TranslateService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getListLoans();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  getListLoans() {
    this.exchangeService.getAllLoans().subscribe((val) => {
      this.dataSource = val;
      this.ref.markForCheck();
    });
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

  checkRole(item) {
    const role = JSON.parse(sessionStorage.getItem('user')).authorities[0].authority;
    if(role == 'ROLE_EMPLOYEE') {
      return false
    }
    if (!item.confirmed || item.rejected || item.approved) {
      return false;
    }
    if (item.status == 'APPROVED BY TRANSACTION MANAGER' && role == 'ROLE_TRANSACTIONMANAGER') {
      return false;
    }
    if (item.status == 'APPROVED BY TRANSACTION MANAGER' && role == 'ROLE_BRANCHMANAGER') {
      return true;
    }
    return true;
  }
  checkRole2(item) {
    const role = JSON.parse(sessionStorage.getItem('user')).authorities[0].authority;
    if(role == 'ROLE_EMPLOYEE') {
      return false
    }
    if (!item.confirmed || item.rejected || item.approved) {
      return false;
    }
    if (item.status == 'APPROVED BY TRANSACTION MANAGER' && role == 'ROLE_TRANSACTIONMANAGER') {
      return false;
    }
    if (item.status == 'APPROVED BY TRANSACTION MANAGER' && role == 'ROLE_BRANCHMANAGER') {
      return true;
    }
    return true;
  }

  approval(item) {
    this.exchangeService.approvalVT({loanProfileId: item.id}).subscribe(
      (val) => {
        const message = 'Thao tác thành công';
        this.layoutUtilsService.showActionNotification(message);
        this.router.navigateByUrl('/loans');
      },
      (err) => {
        const message = 'Có lỗi vui lòng thao tác lại';
        this.layoutUtilsService.showActionNotification(message);
      },
    );
  }
  reject(item) {
    this.exchangeService.rejectVT({loanProfileId: item.id}).subscribe(
      (val) => {
        const message = 'Thao tác thành công';
        this.layoutUtilsService.showActionNotification(message);
        this.router.navigateByUrl('/loans');
      },
      (err) => {
        const message = 'Có lỗi vui lòng thao tác lại';
        this.layoutUtilsService.showActionNotification(message);
      },
    );
  }

  viewHsvt(item) {
    const dialog = this.dialog.open(HsvtComponent, {
      data: {item},
      width: '900px',
      disableClose: true
    })
    dialog.afterClosed().subscribe(val=> {
      this.getListLoans();
    })
  }
  createHsvt() {
    const dialog = this.dialog.open(HsvtComponent, {
      width: '900px',
      disableClose: true
    })
    dialog.afterClosed().subscribe(val=> {
      this.getListLoans();
    })
  }
}
