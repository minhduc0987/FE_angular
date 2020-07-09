import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import { AuthNoticeService } from 'src/app/core/auth';
import { TranslateService } from '@ngx-translate/core';

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
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      amount: ['', Validators.required],
      time: ['', Validators.required],
      ls: [{ value: null, disabled: true }, Validators.required],
      tk: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getAccount();
    this.getLoan()
  }

  submit() {
    // const params = {
    //   accountNumber: this.formId.get('idBank').value,
    //   amount: this.formId.get('money').value,
    //   fullName: this.name,
    //   pin: this.formPass.get('password').value,
    //   description: this.formId.get('note').value,
    // };
    // this.account.forEach((val) => {
    //   if (val.accountNumber === this.stk) {
    //     return;
    //   }
    // });
    // this.exchangeService.exchange(params, this.id).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //   },
    //   (error: any) => {
    //     if (error.status === 200) {
    //       this.show = false;
    //       this.show2 = true;
    //     }
    //   },
    // );
  }

  formatNumber(n: any) {
    if (n !== null) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      this.ref.markForCheck()
    });
  }
  
  changeLs() {
    this.formId.patchValue({
      ls: this.loans[this.formId.get('time').value - 1].interestRate,
    });
  }
}
