import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'kt-exchange-in',
  templateUrl: './exchange-in.component.html',
  styleUrls: ['./exchange-in.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ExchangeInComponent implements OnInit {
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
      name: ['', Validators.required],
      cmnd: ['', Validators.required],
      money: ['', Validators.required],
    });
    this.getAccount();
  }

  getAccount() {
    const userId = localStorage.getItem('userId');
    this.account$ = this.userService.getListAccountExchange(userId);
    this.account$.subscribe(
      (val) => {
        val.forEach((element) => {
          this.account.push({
            id: element.id,
            amount: element.amount,
            stk: element.accountNumber + ' - Số dư ' + this.formatNumber(element.amount) + ' VNĐ',
            st: element.card.cardNumber,
          });
        });
      },
      (err) => {
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message, 'danger');
        return;
      }
    );
  }

  changeI1(e) {
    this.soDu = this.formatNumber(e.amount);
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
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    if (!this.formId.get('name').value) {
      const message = this.translate.instant('VALIDATION.NGUOI_NHAN');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }
    if (!this.formId.get('cmnd').value || this.formId.get('cmnd').value.length !== 12) {
      const message = this.translate.instant('VALIDATION.CMND');
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
    if (Number(money) < 50000) {
      const message = this.translate.instant('VALIDATION.MONEY_MIN');
      this.layoutUtilsService.showActionNotification(message);
      return;
    }

    const params = {
      recieverFullname: this.formId.get('name').value,
      recieverIdCardNumber: Number(this.formId.get('cmnd').value),
      transactionAmount: Number(this.formatNumber2(this.formId.get('money').value)),
    };

    const userId = localStorage.getItem('userId');
    const id = this.form1.get('stk').value;
    

    this.exchangeService.createSec(params, userId, id).subscribe(
      (val) => {
        const message = this.translate.instant('SUCCESS');
        this.layoutUtilsService.showActionNotification(message);
        this.router.navigateByUrl('/user-detail/exchange-sec-history')
      },
      (err) => {
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message);
      },
    );
  }

  onKeyMoney() {
    this.formId.patchValue({
      money: this.formatNumber(this.formId.get('money').value),
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
}
