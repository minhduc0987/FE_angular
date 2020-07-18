import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-list-sec',
  templateUrl: './list-sec.component.html',
  styleUrls: ['./list-sec.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSecComponent implements OnInit {
  displayedColumns = ['id', 'amount', 'name', 'cmnd', 'date1', 'date2', 'status', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  userForm: FormGroup;
  dataSource: any = [];
  private subscriptions: Subscription[] = [];
  constructor(
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private userProfileService: UserProfileService,
    private layoutUtilsService: LayoutUtilsService,private router: Router,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      fullname: ['', Validators.required],
      idCardNumber: ['', Validators.required],
    });
  }

  submit() {
    const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
      );
      const message = 'Vui lòng điền hết các trường';
      this.layoutUtilsService.showActionNotification(message, 'danger');
			return;
		}
    const param = {
      recieverFullName: this.userForm.get('fullname').value,
      recieverIdCardNumber: this.userForm.get('idCardNumber').value,
    }
    this.exchangeService.getSec(param).subscribe(
      val=>{this.dataSource = val; this.ref.markForCheck()},
      err=>{
        // const message = err?.error?.message || 'Có lỗi vui lòng thao tác lại';
        const message = 'Không có thông tin séc này trên hệ thông';
      this.layoutUtilsService.showActionNotification(message, 'danger');}
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  getStatus(item) {
    if(item.canceled) {
      return 'Đã huỷ'
    }
    if(item.status) {
      return 'Đã rút'
    }
    return 'Có thể rút'
  }
  getDate(date) {
    return moment(date).format('YYYY/MM/DD hh:mm:ss');
  }
  rutSec(item) {
    const param = {
      chequeId: item.id
    }
    this.exchangeService.rutSec(param).subscribe(
      val=>{
        const message = val?.message || 'Rút séc thành công';
      this.layoutUtilsService.showActionNotification(message, 'success');
      this.router.navigateByUrl('/dashboard/list-transaction');
      this.ref.markForCheck()
    },
      err=>{const message = err?.error?.message || 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message, 'danger');
    }
    )
  }
  formatNumber(n: any) {
    if (n !== null) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

}
