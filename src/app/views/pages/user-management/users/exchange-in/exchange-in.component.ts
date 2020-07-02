import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';

@Component({
  selector: 'kt-exchange-in',
  templateUrl: './exchange-in.component.html',
  styleUrls: ['./exchange-in.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class ExchangeInComponent implements OnInit {
  loading = false;
  formId: FormGroup;
  formPass: FormGroup;
  items = [
    {id: '1', label: 'Chuyển tiền qua số tài khoản'},
    {id: '2', label: 'Chuyển tiền qua số thẻ'}
  ];
  selectPT = '1';
  account$: Observable<any>;
  userExchange$: Observable<any>;
  account: any[] = [];
  phuongThuc = false;
  stk;
  st;
  soDu = '0';
  inputStk;
  name;
  show = false;
  isSuccess = false;

  constructor(
    private _formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private router: Router,
    private config: NgSelectConfig
  ) { }

  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      idBank: ['', Validators.required],
      money: ['', Validators.required],
      note: ['', Validators.required],
    });
    this.formPass = this._formBuilder.group({
      password: ['', Validators.required]
    });
    this.formId.get('idBank').valueChanges.subscribe(val=>{
      this.name = '';
      if(val && Number(val) &&val.length === 12) {
        this.getNguoiNhan(val)
      }
    })
    this.getAccount();
  }

  submit() {
    const params = {
      accountNumber: this.formId.get('idBank').value,
      amount: this.formId.get('money').value,
      fullName: this.name,
      pin: this.formPass.get('password').value,
      description: this.formId.get('note').value
    }
    const userId = localStorage.getItem('userId')
    this.exchangeService.exchange(params, userId).subscribe(() => {
      this.show = false;
      this.isSuccess = true;
      console.log(this.isSuccess)
    });
  }

  getAccount() {
    const userId = localStorage.getItem('userId')
    this.account$ = this.userService.getListAccount(userId);
    this.account$.subscribe(val=>{
      val.forEach(element => {
        this.account.push({
          id: element.id,
          amount: element.amount,
          stk: element.accountNumber,
          st: element.card.cardNumber
        })
      });
    })
  }

  changePhuongThuc() {
    this.phuongThuc = !this.phuongThuc;
    this.soDu = '0';
    this.stk = this.st = null;
  }

  changeI1(e){
    this.soDu = e.amount;
  };

  changeI2(e){
    this.soDu = e.amount;
  };

  getNguoiNhan(id: string) {
    let params;
    if(!this.phuongThuc) {
      params = {
        term: id,
        type: 'ACCOUNTNUMBER'
      }
    } else {
      params = {
        term: id,
        type: 'CARDNUMBER'
      }
    }
    this.userExchange$ = this.exchangeService.getUserExchange(params)
    this.userExchange$.subscribe(val=> {
      this.name = val.fullname;
    })
  }

  next() {
		const controls = this.formId.controls;
		/** check form */
		if (this.formId.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
    }
    if (!this.name) {
      return
    }
    this.show = true;
  }

  cancel() {
    this.show = false;
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
