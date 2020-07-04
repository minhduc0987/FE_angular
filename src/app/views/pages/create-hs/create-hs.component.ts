import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'kt-create-hs',
  templateUrl: './create-hs.component.html',
  styleUrls: ['./create-hs.component.scss']
})
export class CreateHsComponent implements OnInit {
  formId: FormGroup;
  constructor(private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      idBank: ['', Validators.required],
      money: ['', Validators.required],
      note: ['', Validators.required],
    });
  }

}
