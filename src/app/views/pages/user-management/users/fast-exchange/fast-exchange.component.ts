import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import { AuthNoticeService } from 'src/app/core/auth';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService } from 'src/app/core/_base/crud';

@Component({
  selector: 'kt-fast-exchange',
  templateUrl: './fast-exchange.component.html',
  styleUrls: ['./fast-exchange.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class FastExchangeComponent implements OnInit {
  loading = false;
  loans = [];
  chiNhanh = [];
  formId: FormGroup;
  items = [
    { id: '1', label: 'Chuyển tiền qua số tài khoản' },
    { id: '2', label: 'Chuyển tiền qua số thẻ' },
  ];
  selectPT = '1';
  account$: Observable<any>;
  userExchange$: Observable<any>;
  account: any[] = [];
  phuongThuc = false;
  stk: any;
  st: any;
  soDu = '0';
  inputStk: any;
  name: string;
  show = false;
  show2 = false;
  isSuccess = false;
  id: any;

  constructor(
    private _formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private router: Router,
    private config: NgSelectConfig,
    private authNoticeService: AuthNoticeService,
    private translate: TranslateService,
    private layoutUtilsService: LayoutUtilsService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      amount: ['', Validators.required],
      time: ['', Validators.required],
      ls: [{ value: null, disabled: true }, Validators.required],
      tk: ['', Validators.required],
      description: ['', Validators.required],
      chinhanh: ['', Validators.required],
    });
    this.getAccount();
    this.getLoan();
    this.getChiNhanh();
  }

  submit() {
    const controls = this.formId.controls;
    if (this.formId.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    const params = {
      amount: this.formatNumber2(this.formId.get('amount').value),
      description: this.formId.get('description').value,
      loanInterestRateId: this.formId.get('time').value,
      accountId: this.formId.get('tk').value,
      transasctionOfficeId: this.formId.get('chinhanh').value,
    };
    this.exchangeService.createLoan(params).subscribe(
      (response: any) => {
        const message = 'Đăng kí vay tiền thành công';
        this.layoutUtilsService.showActionNotification(message, 'success');
        this.router.navigateByUrl('user-detail/thong-tin')
      },
      (error: any) => {
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
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
      return n
        .toString()
        .replace(/\D/g, '')
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
      this.formId.patchValue({
        time: this.loans[0].id,
        ls: this.loans[0].interestRate,
      });
      this.ref.markForCheck();
    });
  }

  onKeyMoney() {
    this.formId.patchValue({
      amount: this.formatNumber(this.formId.get('amount').value),
    });
  }

  getAccount() {
    const userId = localStorage.getItem('userId');
    this.userService.getListAccountExchange(userId).subscribe((val) => {
      val.forEach((element) => {
        this.account.push({
          id: element.id,
          amount: element.amount,
          stk: element.accountNumber + ' - Số dư ' + this.formatNumber(element.amount) + ' VNĐ',
          st: element.card.cardNumber,
        });
      });
      this.formId.patchValue({
        tk: this.account[0].id,
      });
      this.ref.markForCheck();
    });
  }

  changeLs() {
    this.formId.patchValue({
      ls: this.loans[this.formId.get('time').value - 1].interestRate,
    });
  }

  getChiNhanh() {
    this.userService.getChiNhanh().subscribe((val) => {
      val.forEach((element) => {
        this.chiNhanh.push({
          id: element.id,
          name: element.name + `-` + element.address,
        });
      });
      this.formId.patchValue({
        chinhanh: this.chiNhanh[0].id,
      });
      this.ref.markForCheck();
    });
  }
}
