import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'kt-exchange-out',
  templateUrl: './exchange-out.component.html',
  styleUrls: ['./exchange-out.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class ExchangeOutComponent implements OnInit {
  exchangeInForm: FormGroup;
  loading = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  items = [
    {id: "1", label: 'Chuyển tiền qua số tài khoản'},
    {id: "2", label: 'Chuyển tiền qua số thẻ'}
  ]

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      idBank: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', Validators.required]
    });
  }

  submit() {

  }

}
