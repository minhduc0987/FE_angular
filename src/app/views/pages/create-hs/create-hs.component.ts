import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormTstcDialogComponent } from '../../partials/content/crud';
import { ExchangeService } from 'src/app/core/apps';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-create-hs',
  templateUrl: './create-hs.component.html',
  styleUrls: ['./create-hs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHsComponent implements OnInit {
  formId: FormGroup;
  formId2: FormGroup;
  formPass2: FormGroup;
  listHsv = [];
  loans = [];
  loan$: Observable<any>;
  userIn = [];
  userIn$: Observable<any>;
  isTstc = false;
  isOtp = false;
  proId: any;
  loanProfileId: any;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private exchangeService: ExchangeService,
    private translate: TranslateService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('userSearch'));
    this.formId = this._formBuilder.group({
      name: [{ value: user.fullname, disabled: true }, Validators.required],
      phone: [{ value: user.phone, disabled: true }, Validators.required],
      address: [{ value: user.address, disabled: true }, Validators.required],
      idCardNumber: [{ value: user.idCardNumber, disabled: true }, Validators.required],
    });
    this.formId2 = this._formBuilder.group({
      amount: ['', Validators.required],
      time: ['', Validators.required],
      ls: ['', Validators.required],
      money: ['', Validators.required],
      tk: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.formPass2 = this._formBuilder.group({
      password2: ['', Validators.required],
    });
    this.getLoan();
    this.getUserIn();
  }

  show() {
    const dialogRef = this.dialog.open(FormTstcDialogComponent, {
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.listHsv.push(res);
      this.update(res);
      this.ref.markForCheck();
    });
  }

  create() {
    if(!this.formId2.get('amount').value) {
      const message = this.translate.instant('VALIDATION.LOAN_MONEY');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    if(!this.formId2.get('description').value) {
      const message = this.translate.instant('VALIDATION.LOAN_MONEY_CONTENT');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    if(!this.formId2.get('tk').value) {
      const message = this.translate.instant('VALIDATION.LOAN_TK');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    const user = JSON.parse(sessionStorage.getItem('userSearch'));
    const params = {
      amount: Number(this.formatNumber2(this.formId2.get('amount').value)),
      description: this.formId2.get('description').value,
      loanInterestRateId: this.loans[this.formId2.get('time').value - 1].id,
      accountId: this.formId2.get('tk').value,
    };
    const id = user.id;
    this.exchangeService.createLoan(params, id).subscribe(
      (val) => {
        this.proId = val.message
        this.isTstc = true;
        this.ref.markForCheck();
      },
      (err) => {
        const message = err.error.message;
        this.layoutUtilsService.showActionNotification(message);
      },
    );
  }

  getUserIn() {
    const user = JSON.parse(sessionStorage.getItem('userSearch'));
    this.userIn$ = this.exchangeService.getUserIn(user.id);
    this.userIn$.subscribe((val) => {
      val.forEach((element) => {
        this.userIn.push({
          id: element.id,
          stk: element.accountNumber || 'tesst',
        });
      });
    });
  }

  getLoan() {
    this.loan$ = this.exchangeService.getLoan();
    this.loan$.subscribe((val) => {
      if (val) {
        val.forEach((element) => {
          this.loans.push({
            id: element.id,
            months: element.months.toString() + ' tháng',
            interestRate: element.interestRate.toString() + '%',
          });
        });
      }
      this.formId2.patchValue({
        time: this.loans[0].id,
        ls: this.loans[0].interestRate,
      });
    });
  }

  changeLs() {
    this.formId2.patchValue({
      ls: this.loans[this.formId2.get('time').value - 1].interestRate,
    });
  }
  onKeyMoney() {
    this.formId2.patchValue({
      amount: this.formatNumber(this.formId2.get('amount').value),
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

  update(params) {
    const userId = JSON.parse(sessionStorage.getItem('userSearch')).id;
    const id = this.proId;
    this.exchangeService.addTstc(params,userId, id).subscribe(val => {
      const message = 'Thêm tài sản thế chấp thành công';
      this.layoutUtilsService.showActionNotification(message);
    },
    (err)=> {
      const message = this.translate.instant('ERROR');
      this.layoutUtilsService.showActionNotification(message);
    })
  }

  submit() {
    const params = {
      loanProfileId: this.proId
    }
    const userId = JSON.parse(sessionStorage.getItem('userSearch')).id;
    this.exchangeService.approveHsv(params, userId).subscribe(val => {
      const message = 'Xác nhận hồ sơ vay thành công';
      this.layoutUtilsService.showActionNotification(message);
      this.isOtp = true;
      this.loanProfileId = val.message;
      this.ref.markForCheck();
    },
    (err)=> {
      const message = this.translate.instant('ERROR');
      this.layoutUtilsService.showActionNotification(message);
    })
  }
  cancel () {
    this.isOtp = false;
  }

  submit2() {
    const params = {
      loanProfileId: Number(this.loanProfileId),
      otpCode: this.formPass2.get('password2').value
    }
    this.exchangeService.comfirmHsv(params).subscribe(val => {
      this.isOtp = false;
      this.ref.markForCheck();
      const message = 'Xác nhận hồ sơ vay thành công';
      this.layoutUtilsService.showActionNotification(message);
      setTimeout(()=> {
        this.router.navigateByUrl('/loans');
      },3000)
    },
    (err)=> {
      const message = this.translate.instant('ERROR');
      this.layoutUtilsService.showActionNotification(message);
    })
  }
}
