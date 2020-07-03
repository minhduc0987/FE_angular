import { Component, OnInit } from '@angular/core';
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
  ) {}

  ngOnInit(): void {
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
      if (val && Number(val) && val.length === 12) {
        this.getNguoiNhan(val);
      }
    });
    this.getAccount();
  }

  submit() {
    const params = {
      accountNumber: this.formId.get('idBank').value,
      amount: this.formId.get('money').value,
      fullName: this.name,
      pin: this.formPass.get('password').value,
      description: this.formId.get('note').value,
    };
    this.account.forEach((val) => {
      if (val.accountNumber === this.stk) {
        return;
      }
    });
    this.exchangeService.exchange(params, this.id).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        if (error.status === 200) {
          this.show = false;
          this.show2 = true;
        }
      },
    );
  }

  submit2() {
    this.show = false;
    this.show2 = false;
    this.isSuccess = true;
  }

  getAccount() {
    const userId = localStorage.getItem('userId');
    this.account$ = this.userService.getListAccount(userId);
    this.account$.subscribe((val) => {
      val.forEach((element: { id: any; amount: any; accountNumber: any; card: { cardNumber: any } }) => {
        this.account.push({
          id: element.id,
          amount: element.amount,
          stk: element.accountNumber,
          st: element.card.cardNumber,
        });
      });
    });
  }

  changePhuongThuc() {
    this.phuongThuc = !this.phuongThuc;
    this.soDu = '0';
    this.stk = this.st = null;
  }

  changeI1(e: { amount: string; id: any }) {
    this.soDu = e.amount;
    this.id = e.id;
  }

  changeI2(e: { amount: string; id: any }) {
    this.soDu = e.amount;
    this.id = e.id;
  }

  getNguoiNhan(id: string) {
    let params: { term: string; type: string };
    if (!this.phuongThuc) {
      params = {
        term: id,
        type: 'ACCOUNTNUMBER',
      };
    } else {
      params = {
        term: id,
        type: 'CARDNUMBER',
      };
    }
    this.userExchange$ = this.exchangeService.getUserExchange(params);
    this.userExchange$.subscribe((val) => {
      this.name = val.fullname;
    }),
      // tslint:disable-next-line:no-unused-expression
      (_err: any) => {
        this.authNoticeService.setNotice(this.translate.instant('VALIDATION.ERROR'), 'danger');
      };
  }

  next() {
    const controls = this.formId.controls;
    /** check form */
    if (this.formId.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    if (!this.name) {
      return;
    }
    this.show = true;
  }

  next2() {
    const controls = this.formId.controls;
    /** check form */
    if (this.formPass.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    if (!this.name) {
      return;
    }
    this.show = false;
    this.show2 = true;
  }

  cancel() {
    this.show = false;
    this.show2 = false;
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.formId.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasError2(controlName: string, validationType: string): boolean {
    const control = this.formPass.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
