import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'kt-fast-exchange',
  templateUrl: './fast-exchange.component.html',
  styleUrls: ['./fast-exchange.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class FastExchangeComponent implements OnInit {
  exchangeInForm: FormGroup;
  loading = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


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