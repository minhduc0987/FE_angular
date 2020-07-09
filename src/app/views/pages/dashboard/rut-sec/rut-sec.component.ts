import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserProfileService, ExchangeService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-rut-sec',
  templateUrl: './rut-sec.component.html',
  styleUrls: ['./rut-sec.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RutSecComponent implements OnInit {
  userForm: FormGroup;

  constructor(private userFB: FormBuilder,
    private userProfileService: UserProfileService,private layoutUtilsService: LayoutUtilsService, private router: Router,
    private exchangeService: ExchangeService,    private translate: TranslateService,private ref: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.userForm = this.userFB.group({
      fullname: [null, Validators.required],
      idCardNumber: [null, Validators.required],
    });
  }

  submit() {
    const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
      );
      const message = 'Vui lòng điền hết các trường';
      this.layoutUtilsService.showActionNotification(message, 'danger');
			return;
		}
    const param = {
      recieverFullName: this.userForm.get('fullname').value,
      recieverIdCardNumber: this.userForm.get('idCardNumber').value,
    }
    this.exchangeService.rutSec(param).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message);
      this.router.navigateByUrl('/dashboard')},
      err=>{const message = err?.error?.message || 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message, 'danger');}
    )
  }

}
