import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ExchangeService } from 'src/app/core/apps';

@Component({
  selector: 'kt-exchange-in',
  templateUrl: './exchange-in.component.html',
  styleUrls: ['./exchange-in.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
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

  constructor(
    private _formBuilder: FormBuilder,
    private exchangeService: ExchangeService
  ) { }

  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      idBank: ['444411111001', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]]
    });
    this.formPass = this._formBuilder.group({
      password: ['', Validators.required]
    });
    this.formId.get('idBank').valueChanges
        .subscribe((newValue: string) => {
          if (Number(newValue)) {
            if(newValue.length === 12) {
              this.getUserExchange(newValue);
            }
          }
        });
  }

  submit() {

  }

  getUserExchange(id: string) {
    const params = {
      term: id,
      type:'ACCOUNTNUMBER'
    }
    this.userExchange$ = this.exchangeService.getUserExchange(params);
  }

  getAccount(id: string) {
    const params = {
      term: id,
      type:'ACCOUNTNUMBER'
    }
    this.userExchange$ = this.exchangeService.getUserExchange(params);
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
