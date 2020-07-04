// Angular
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/apps';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  formId: FormGroup;
  user$: Observable<any>;
  items = [
    {key: 'IDCARDNUMBER', value: 'CMND/CCCD/Hộ chiếu'},
    {key: 'PHONENUMBER', value: 'Số điện thoại'}
  ]

  constructor(private userProfileService: UserProfileService, private router: Router, private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      id: ['', Validators.required],
      select: ['IDCARDNUMBER', Validators.required],
    });
    this.formId.get('id').valueChanges.subscribe((val) => {
      if (val && Number(val) && val.length === 12) {
        this.searchUser(val);
      }
    });
  }

  searchUser(id) {
    const params = {
      term: this.formId.get('id').value,
      type: this.formId.get('select').value,
    };
    this.user$ = this.userProfileService.getUser(params)
    this.user$.subscribe(
      (res)=>{},
      (err)=>{console.log(err)},
      );
  }
}
