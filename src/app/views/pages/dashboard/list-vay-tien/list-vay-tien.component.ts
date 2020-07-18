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
  chinhanhs = [];
  chinhanh;
  disabled = true;
  dataSource: any = [];
  pageEvent: PageEvent;
  stk;
  id;
  statuss = [
    {key: '5', value: 'Tất cả'},
    {key: '0', value: 'Chưa xác nhận'},
    {key: '1', value: 'Chờ xác minh'},
    {key: '2', value: 'Chờ xem xét'},
    {key: '3', value: 'Chờ phê duyệt'},
    {key: '4', value: 'Đã phê duyệt'}
  ]
  status = '5';
  isDisable1 = true;
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
    const role = JSON.parse(localStorage.getItem('user')).roles[0].name;
    if (role === 'ROLE_EMPLOYEE') {
      this.isDisable1 = true;
    } else {
      this.isDisable1 = false;
    }
    if(role === 'ROLE_BRANCHMANAGER') {
      this.disabled = false;
      this.chinhanhs = [];
      this.exchangeService.getPGD().subscribe(val=> {
        val.forEach(element => {
          this.chinhanhs.push({
            id: element.id,
            value: element.name + `-` + element.address
          })
        });
        this.ref.markForCheck();
      })
    }
    this.getListLoans();
  }
  change(event) {
    this.chinhanh = event.id;
    this.getListLoans()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  getListLoans() {
    const role = JSON.parse(localStorage.getItem('user')).roles[0].name;
    if(role === 'ROLE_EMPLOYEE') {
      this.exchangeService.getAllLoans().subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    } else if (role === 'ROLE_TRANSACTIONMANAGER') {
      this.exchangeService.getAllLoans2().subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    } else {
      this.exchangeService.getAllLoans3(this.chinhanh).subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    }
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
    const role = JSON.parse(localStorage.getItem('user')).roles[0].name
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
    const role = JSON.parse(localStorage.getItem('user')).roles[0].name
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
        this.layoutUtilsService.showActionNotification(message, 'success');
        this.router.navigateByUrl('/loans');
      },
      (err) => {
        const message = 'Có lỗi vui lòng thao tác lại';
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
  }
  reject(item) {
    this.exchangeService.rejectVT({loanProfileId: item.id}).subscribe(
      (val) => {
        const message = 'Thao tác thành công';
        this.layoutUtilsService.showActionNotification(message, 'success');
        this.router.navigateByUrl('/loans');
      },
      (err) => {
        const message = 'Có lỗi vui lòng thao tác lại';
        this.layoutUtilsService.showActionNotification(message, 'danger');
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

  setItems(event) {
    const page = event.pageIndex + 1;
    // this.exchangeService.getAllLoans(page).subscribe((val) => {
    //   this.dataSource = val;
    //   this.ref.markForCheck();
    // });

    const role = JSON.parse(localStorage.getItem('user')).roles[0].name
    if(role == 'ROLE_EMPLOYEE') {
      this.exchangeService.getAllLoans(page).subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    }
    if (role == 'ROLE_TRANSACTIONMANAGER') {
      this.exchangeService.getAllLoans4(this.status, page).subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    }
    if(role == 'ROLE_BRANCHMANAGER') {
      this.exchangeService.getAllLoans5(this.chinhanh, this.status).subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    }
  }

  change2(item) {
    const param = {
      status: this.status
    }
    const role = JSON.parse(localStorage.getItem('user')).roles[0].name
    if(role == 'ROLE_EMPLOYEE') {
      this.exchangeService.getAllLoans().subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    }
    if (role == 'ROLE_TRANSACTIONMANAGER') {
      this.exchangeService.getAllLoans4(this.status).subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    }
    if (role == 'ROLE_BRANCHMANAGER') {
      this.exchangeService.getAllLoans5(this.chinhanh, this.status).subscribe((val) => {
        this.dataSource = val;
        this.ref.markForCheck();
      });
    }
  }
}
