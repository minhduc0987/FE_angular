import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthNoticeService } from 'src/app/core/auth';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'kt-exchange-out',
  templateUrl: './exchange-out.component.html',
  styleUrls: ['./exchange-out.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeOutComponent implements OnInit {
  loading = false;
  form1: FormGroup;
  formId: FormGroup;
  formPass: FormGroup;
  formPass2: FormGroup;
  items = [
    { id: '1', label: 'Chuyển tiền qua số tài khoản' },
    { id: '2', label: 'Chuyển tiền qua số thẻ' },
  ];
  selectPT = '1';
  account$: Observable<any>;
  userExchange$: Observable<any>;
  account: any[] = [];
  soDu = '0';
  inputStk;
  name;
  show = false;
  show2 = false;
  isSuccess = false;
  id;
  idGd;

  constructor(
    private _formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private config: NgSelectConfig,
    private authNoticeService: AuthNoticeService,
    private translate: TranslateService,
    private layoutUtilsService: LayoutUtilsService,
  ) {}

  ngOnInit(): void {
    this.form1 = this._formBuilder.group({
      selectPT: ['1', Validators.required],
      stk: [null, Validators.required],
    });
    this.formId = this._formBuilder.group({
      idBank: ['', Validators.required],
      money: ['', Validators.required],
      note: ['', Validators.required],
    });
    this.formPass = this._formBuilder.group({
      password: ['', Validators.required],
    });
    this.formPass2 = this._formBuilder.group({
      password2: ['', Validators.required],
    });
    this.formId.get('idBank').valueChanges.subscribe((val) => {
      this.name = '';
      if (val && Number(this.formatNumber3(val)) && this.formatNumber3(val).length === 12) {
        this.getNguoiNhan(val);
      }
    });
    this.getAccount();
  }

  submit() {
    if (!this.formPass.get('password').value) {
      const message = this.translate.instant('VALIDATION.PASSWORD');
      this.layoutUtilsService.showActionNotification(message, 'danger');
      return;
    }
    if (this.formPass.get('password').value.length !== 4) {
      const message = this.translate.instant('VALIDATION.PASSWORD_NO');
      this.layoutUtilsService.showActionNotification(message, 'danger');
      this.formPass.patchValue({
        password: '',
      });
      return;
    }
    const params = {
      accountNumber: this.formatNumber3(this.formId.get('idBank').value),
      amount: this.formatNumber2(this.formId.get('money').value),
      fullName: this.name,
      pin: this.formPass.get('password').value,
      description: this.formId.get('note').value,
    };
    this.account.forEach((val) => {
      if (val.accountNumber === this.form1) {
        return;
      }
    });
    if (this.show) {
      this.exchangeService.exchange(params, this.form1.get('stk').value).subscribe(
        (res) => {
          if (res.message && res.message === 'Transfer successfully') {
            this.show = false;
            this.show2 = false;
            const message = this.translate.instant('EXCHANGE.SUCCESS');
            this.layoutUtilsService.showActionNotification(message, 'danger');
            setTimeout(() => {
              this.router.navigateByUrl('/user-detail/lich-su-giao-dich');
            }, 3000);
          } else {
            this.show = false;
            this.show2 = true;
            this.idGd = res.message;
          }
          this.ref.markForCheck();
        },
        (err) => {
          const message = this.translate.instant('ERROR');
          this.layoutUtilsService.showActionNotification(message, 'danger');
        },
      );
    }
  }

  submit2() {
    const comfirm = this.layoutUtilsService.deleteElement('Chuyển tiền', 'Xác nhận chuyển tiền?');
    comfirm.afterClosed().subscribe((val) => {
      if (val) {
        const params = {
          transactionQueueId: this.idGd,
          otpCode: this.formPass2.get('password2').value,
        };
        if (this.show2) {
          this.exchangeService.exchangeOTP(params).subscribe(
            (val) => {
              this.show2 = false;
              const message = this.translate.instant('EXCHANGE.SUCCESS');
              this.layoutUtilsService.showActionNotification(message);
              setTimeout(() => {
                this.router.navigateByUrl('/user-detail/lich-su-giao-dich');
              }, 3000);
              this.ref.markForCheck();
            },
            (_err: any) => {
              const message = this.translate.instant('ERROR');
              this.layoutUtilsService.showActionNotification(message);
            },
          );
        }
      }
    });
  }

  getAccount() {
    const userId = localStorage.getItem('userId');
    this.account$ = this.userService.getListAccountExchange(userId);
    this.account$.subscribe((val) => {
      val.forEach((element) => {
        this.account.push({
          id: element.id,
          amount: element.amount,
          stk: element.accountNumber + ' - Số dư ' + this.formatNumber(element.amount) + ' VNĐ',
          st: element.card.cardNumber,
        });
      });
    });
  }

  onKeyMoney() {
    this.formId.patchValue({
      money: this.formatNumber(this.formId.get('money').value),
    });
  }

  onKeyBank() {
    this.formId.patchValue({
      idBank: this.formatNumber1(this.formId.get('idBank').value),
    });
  }

  changeI1(e) {
    this.soDu = this.formatNumber(e.amount);
  }

  getNguoiNhan(id: string) {
    let params;
    if (this.form1.get('selectPT').value === '1') {
      params = {
        term: this.formatNumber3(id),
        type: 'ACCOUNTNUMBER',
      };
    } else {
      params = {
        term: this.formatNumber3(id),
        type: 'CARDNUMBER',
      };
    }
    // this.userExchange$ = this.exchangeService.getUserExchange(params);
    this.exchangeService.getUserExchange(params).subscribe(
      (val) => {
        this.name = val.fullname;
      },
      (err) => {
        const message = 'Không tìm thấy tài khoản trên hệ thống';
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
  }

  next() {
    const controls = this.formId.controls;
    const controls1 = this.form1.controls;
    if (this.form1.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
    }
    if (this.formId.invalid) {
      Object.keys(controls1).forEach((controlName) => controls1[controlName].markAsTouched());
    }
    if (!this.form1.get('stk').value) {
      const message = this.translate.instant('VALIDATION.STK');
      this.layoutUtilsService.showActionNotification(message, 'danger');
      return;
    }
    if (!this.formId.get('idBank').value) {
      const message = this.translate.instant('VALIDATION.NGUOI_NHAN');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    if (!this.name) {
      const message = this.translate.instant('VALIDATION.NGUOI_NHAN1');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    const money = this.formatNumber2(this.formId.get('money').value);
    if (!money) {
      const message = this.translate.instant('VALIDATION.MONEY_NONE');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    if (!Number(money)) {
      const message = this.translate.instant('VALIDATION.NO');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    if (Number(money) < 20000) {
      const message = this.translate.instant('VALIDATION.MONEY_MIN');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    if (this.soDu) {
      const sodu = Number(this.formatNumber2(this.formatNumber2(this.soDu)));
      if (Number(money) > sodu) {
        const message = this.translate.instant('VALIDATION.MONEY_MAX');
        this.layoutUtilsService.showActionNotification(message);
        return;
      }
    }
    if (!this.formId.get('note').value) {
      const message = this.translate.instant('VALIDATION.NOTE');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    this.show = true;
  }

  next2() {
    this.show = false;
    this.show2 = true;
  }

  cancel() {
    this.show = false;
    this.show2 = false;
    this.formPass.patchValue({
      password: '',
    });
    this.formPass2.patchValue({
      password2: '',
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
  formatNumber1(n: any) {
    if (n !== null) {
      return n
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
  }
  formatNumber2(n: any) {
    if (n !== null) {
      return n.toString().replace(/\,/g, '');
    }
  }
  formatNumber3(n: any) {
    if (n !== null) {
      return n.toString().replace(/\ /g, '');
    }
  }
}
