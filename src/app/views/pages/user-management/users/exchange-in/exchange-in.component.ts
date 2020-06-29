import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-exchange-in',
  templateUrl: './exchange-in.component.html',
  styleUrls: ['./exchange-in.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class ExchangeInComponent implements OnInit {
  exchangeInForm: FormGroup;
  loading = false;
  formId: FormGroup;
  formPass: FormGroup;
  selected: string;
  userExchange$: any;
  account$: any;
  account: any;
  acc: any;
  name: string;
  isSuccess = false;

  constructor(
    private _formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private userService: UserProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      idBank: ['444411111001', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      money: ['', [Validators.required, Validators.minLength(5)]],
      note: ['', Validators.required],
    });
    this.formPass = this._formBuilder.group({
      password: ['', Validators.required]
    });
    this.formId.get('idBank').valueChanges.subscribe((newValue: string) => {
      if (Number(newValue)) {
        if (newValue.length === 12) {
          this.getUserExchange(newValue);
        }
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
      description: this.formId.get('note').value
    }
    const id = this.account.id;
    this.exchangeService.exchange(params, id).subscribe(() => {
      this.isSuccess = true;
    });
  }

  getUserExchange(id: string) {
    const params = {
      term: id,
      type: 'ACCOUNTNUMBER'
    }
    this.userExchange$ = this.exchangeService.getUserExchange(params)
    this.userExchange$.subscribe(val=> {
      this.name = val.fullname;
    })
  }

  getAccount() {
    this.account$ = this.userService.getListAccount('1');
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

  selectionChange(value) {
    this.account = value;
    console.log(value)
  }

  closeDialog() {
    this.isSuccess = false;
    this.router.navigateByUrl('/user-detail')
  }

}
