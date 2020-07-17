import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from 'src/app/core/apps';
import { Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/core/_base/crud';

@Component({
  selector: 'kt-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formId: FormGroup;
  constructor(private userProfileService: UserProfileService,
    private _formBuilder: FormBuilder,private layoutUtilsService: LayoutUtilsService,
    private route: Router
    ) { }
  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      pass3: ['', Validators.required],
    });
  }

  change() {
    const param = {
      password: this.formId.get('pass2').value,
      passwordConfirm: this.formId.get('pass3').value
    }
    this.userProfileService.changePassword(param).subscribe(val=> {
      this.route.navigateByUrl('/user-detail/thong-tin')
      const message = 'Mật khẩu đã được thay đổi';
        this.layoutUtilsService.showActionNotification(message, 'success');
    })
  }

}
