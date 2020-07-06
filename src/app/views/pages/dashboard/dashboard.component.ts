// Angular
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/apps';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutUtilsService } from 'src/app/core/_base/crud';

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

  constructor(private userProfileService: UserProfileService, private layoutUtilsService: LayoutUtilsService, private router: Router, private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      id: ['12312312300', Validators.required],
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
      (res)=>{
        sessionStorage.setItem('userSearch', JSON.stringify(res));
      },
      (err)=>{console.log(err)},
      );
  }

  lock() {
    const id =  JSON.parse(sessionStorage.getItem('userSearch')).id;
    this.userProfileService.lock(id).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message);
      this.router.navigateByUrl('./dashboard')},
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message);}
    )
  }
  unlock() {
    const id =  JSON.parse(sessionStorage.getItem('userSearch')).id;
    this.userProfileService.lock(id).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message);
      this.router.navigateByUrl('./dashboard')},
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message);}
    )
  }
}
