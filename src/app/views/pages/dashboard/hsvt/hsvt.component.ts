import { Component, OnInit, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { UserProfileService, ExchangeService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormTstcDialogComponent } from 'src/app/views/partials/content/crud';
import { InpitOtpComponent } from 'src/app/views/partials/content/crud/inpit-otp/inpit-otp.component';

@Component({
  selector: 'kt-hsvt',
  templateUrl: './hsvt.component.html',
  styleUrls: ['./hsvt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HsvtComponent implements OnInit {
  userForm: FormGroup;
  isDisable = false;
  isCreate = false;
  isAddTstc = false;
  loans: any = [];
  userIn: any = [];
  listHsvt = [];
  proId: any;
  isApproval = false;
  isRefuse = false;
  isComfirm = false;
  userId: any;
  constructor(
    public dialogRef: MatDialogRef<HsvtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userFB: FormBuilder,
    private userProfileService: UserProfileService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private exchangeService: ExchangeService,
    private ref: ChangeDetectorRef,
    private translate: TranslateService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.userForm.get('stk').valueChanges.subscribe((val) => {
      if (val.length == 12) {
        this.searchUser(val);
      }
    });
    this.getLoan();
    if (this.data) {
      this.proId = this.data.item.id;
      this.listHsvt = this.data.item.assets;
      this.userForm.patchValue({
        name: this.data.item.user.fullname,
        phone: this.data.item.user.phone,
        address: this.data.item.user.address,
        idCardNumber: this.data.item.user.idCardNumber,
        time: this.data.item.loanInterestRate.months,
        ls: this.data.item.loanInterestRate.interestRate,
        amount: this.formatNumber(this.data.item.amount),
        description: this.data.item.description,
      });
      if (this.data.item.rejected) {
        this.isRefuse = false;
        this.isApproval = true;
      } else {
        console.log(JSON.parse(localStorage.getItem('user')))
        switch (this.data.item.status) {
          case '0':
            this.isAddTstc = true;
            this.isComfirm = true;
            break;
          case '1':
            if (JSON.parse(localStorage.getItem('user')).roles[0].name === 'ROLE_EMPLOYEE') {
              this.isRefuse = true;
              this.isApproval = true;
              this.isAddTstc = true;
            }
            break
          case '2': 
            if (JSON.parse(localStorage.getItem('user')).roles[0].name === 'ROLE_TRANSACTIONMANAGER') {
              this.isRefuse = true;
              this.isApproval = true;
            }
            break
          case '3': 
            if (JSON.parse(localStorage.getItem('user')).roles[0].name === 'ROLE_BRANCHMANAGER') {
              this.isRefuse = true;
              this.isApproval = true;
            }
            break
        }
      }
    } else {
      this.isCreate = true;
      this.isAddTstc = true;
    }
  }

  addTstc() {
    const dialogRef = this.dialog.open(FormTstcDialogComponent, {
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.listHsvt.push(res);
      this.update(res);
    });
  }

  update(params) {
    this.exchangeService.addTstc(params, this.data.item.user.id, this.data.item.id).subscribe(
      (val) => {
        const message = 'Thêm tài sản thế chấp thành công';
        this.layoutUtilsService.showActionNotification(message);
      },
      (err) => {
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message);
      },
    );
    this.ref.markForCheck();
  }

  searchUser(id) {
    const params = {
      term: id,
      type: 'IDCARDNUMBER',
    };
    this.userProfileService.getUser(params).subscribe(
      (res) => {
        this.userForm.patchValue({
          name: res.fullname,
          phone: res.phone,
          address: res.address,
          idCardNumber: res.idCardNumber,
        });
        this.userId = res.id;
        this.getUserIn(res.id);
      },
      (err) => {},
    );
  }
  getUserIn(id) {
    this.exchangeService.getUserIn(id).subscribe((val) => {
      val.forEach((element) => {
        this.userIn.push({
          id: element.id,
          stk: this.formatNumber(element.accountNumber),
        });
      });
      this.ref.markForCheck();
    });
  }

  createForm() {
    if (this.data) {
      this.userForm = this.userFB.group({
        stk: [null, Validators.required],
        name: [{ value: null, disabled: true }, Validators.required],
        phone: [{ value: null, disabled: true }, Validators.required],
        address: [{ value: null, disabled: true }, Validators.required],
        idCardNumber: [{ value: null, disabled: true }, Validators.required],
        amount: ['', Validators.required],
        time: ['', Validators.required],
        ls: [{ value: null, disabled: true }, Validators.required],
        tk: ['', Validators.required],
        description: ['', Validators.required],
      });
    } else {
      this.userForm = this.userFB.group({
        stk: ['12312312300', Validators.required],
        name: [{ value: null, disabled: true }, Validators.required],
        phone: [{ value: null, disabled: true }, Validators.required],
        address: [{ value: null, disabled: true }, Validators.required],
        idCardNumber: [{ value: null, disabled: true }, Validators.required],
        amount: ['', Validators.required],
        time: ['', Validators.required],
        ls: [{ value: null, disabled: true }, Validators.required],
        tk: ['', Validators.required],
        description: ['', Validators.required],
      });
    }
  }

  getLoan() {
    this.exchangeService.getLoan().subscribe((val) => {
      if (val) {
        val.forEach((element) => {
          this.loans.push({
            id: element.id,
            months: element.months.toString() + ' tháng',
            interestRate: element.interestRate.toString() + '%',
          });
        });
      }
      this.userForm.patchValue({
        time: this.loans[0].id,
        ls: this.loans[0].interestRate,
      });
      this.ref.markForCheck();
    });
  }
  changeLs() {
    this.userForm.patchValue({
      ls: this.loans[this.userForm.get('time').value - 1].interestRate,
    });
  }

  submit() {
    if (!this.userForm.get('amount').value) {
      const message = this.translate.instant('VALIDATION.LOAN_MONEY');
      this.layoutUtilsService.showActionNotification(message, 'danger');
      return;
    }
    if (!this.userForm.get('description').value) {
      const message = this.translate.instant('VALIDATION.LOAN_MONEY_CONTENT');
      this.layoutUtilsService.showActionNotification(message, 'danger');
      return;
    }
    if (!this.userForm.get('tk').value) {
      const message = this.translate.instant('VALIDATION.LOAN_TK');
      this.layoutUtilsService.showActionNotification(message, 'danger');
      return;
    }
    const params = {
      amount: Number(this.formatNumber2(this.userForm.get('amount').value)),
      description: this.userForm.get('description').value,
      loanInterestRateId: this.loans[this.userForm.get('time').value - 1].id,
      accountId: this.userForm.get('tk').value,
    };
    this.exchangeService.createLoan(params, this.userId).subscribe(
      (val) => {
        this.proId = val.message;
        const message = this.translate.instant('SUCCESS');
        this.layoutUtilsService.showActionNotification(message);
        this.cancel();
        this.ref.markForCheck();
      },
      (err) => {
        const message = err.error.message;
        this.layoutUtilsService.showActionNotification(message);
      },
    );
  }
  unlock() {
    this.userProfileService.lock(this.data.id).subscribe(
      (val) => {
        const message = 'Thành công';
        this.layoutUtilsService.showActionNotification(message);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        const message = 'Có lỗi vui lòng thao tác lại';
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
  }
  lock() {
    this.userProfileService.lock(this.data.id).subscribe(
      (val) => {
        const message = 'Thành công';
        this.layoutUtilsService.showActionNotification(message);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        const message = 'Có lỗi vui lòng thao tác lại';
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
  }
  cancel() {
    this.dialogRef.close();
  }

  onKeyMoney() {
    this.userForm.patchValue({
      amount: this.formatNumber(this.userForm.get('amount').value),
    });
  }

  formatNumber(n: any) {
    if (n !== null) {
      return n
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  formatNumber2(n: any) {
    if (n !== null) {
      return n.toString().replace(/\,/g, '');
    }
  }

  remove(i) {
    this.exchangeService.removeTstc(i).subscribe(
      val=>{
        this.listHsvt.splice(i, 1);
        this.ref.markForCheck();
        const message = 'Đã xoá tài sản thế chấp';
        this.layoutUtilsService.showActionNotification(message, 'success');
      },
      err=>{
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message, 'danger');
      }
    )
  }
  approval() {
    const params = {
      loanProfileId: this.proId,
    };
    this.exchangeService.approvalVT(params).subscribe(
      (val) => {
        const message = 'Gửi yêu cầu xác nhận thành công';
        this.layoutUtilsService.showActionNotification(message, 'success');
        this.ref.markForCheck();
      },
      (err) => {
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
  }

  comfirmOtp(otp) {
    const params = {
      loanProfileId: Number(this.data.item.id),
      otpCode: otp,
    };
    this.exchangeService.comfirmHsv(params).subscribe(
      (val) => {
        this.cancel();
        this.ref.markForCheck();
        const message = 'Xác nhận hồ sơ vay thành công';
        this.layoutUtilsService.showActionNotification(message, 'success');
      },
      (err) => {
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
  }

  refuse() {
    const params = {
      loanProfileId: this.proId,
    };
    this.exchangeService.rejectVT(params).subscribe(
      (val) => {
        const message = 'Gửi yêu cầu xác nhận thành công';
        this.ref.markForCheck();
      },
      (err) => {
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
  }
}
