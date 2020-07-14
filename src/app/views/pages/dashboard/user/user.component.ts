import { Component, OnInit, Input, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService, ExchangeService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'kt-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  isDisable = false;
  isLock = false;
  isUnLock = false;
  image='';
  gender = [
    { key: 'male', value: 'Nam'},
    { key: 'female', value: 'Nữ'}
  ]
  ht = [
    {key: '1', value: 'GOLD'},
    {key: '2', value: 'PLATINUM'},
    {key: '3', value: 'DIAMOND'}
  ]
  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userFB: FormBuilder,
    private userProfileService: UserProfileService,private layoutUtilsService: LayoutUtilsService, private router: Router,
    private exchangeService: ExchangeService,    private translate: TranslateService,private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    if(this.data && !this.data.locked) {
      this.isLock = true;
    }
    if(this.data && this.data.locked) {
      this.isUnLock = true;
    }
    this.createForm();
  }

  createForm() {
    if (this.data) {
      this.userForm = this.userFB.group({
        username: [{ value: this.data?.username, disabled: true }, Validators.required],
        fullname: [{ value: this.data?.fullname, disabled: this.isDisable }, Validators.required],
        email: [{ value: this.data?.email, disabled: this.isDisable }, Validators.required],
        birthday: [{ value: this.data?.birthday, disabled: this.isDisable }, Validators.required],
        gender: [{ value: this.data?.gender, disabled: this.isDisable }, Validators.required],
        idCardNumber: [{ value: this.data?.idCardNumber, disabled: this.isDisable }, Validators.required],
        image: [{ value: this.data?.image, disabled: this.isDisable }, Validators.required],
        phone: [{ value: this.data?.phone, disabled: this.isDisable }, Validators.required],
        address: [{ value: this.data?.address, disabled: this.isDisable }, Validators.required],
        membershipId: [{ value: this.data?.membership?.id.toString(), disabled: this.isDisable }, Validators.required],
      });
      this.image = this.data.image;
    } else {
      this.userForm = this.userFB.group({
        username: [null, Validators.required],
        fullname: [null, Validators.required],
        email: [null, Validators.required],
        birthday: [null, Validators.required],
        gender: ['male', Validators.required],
        idCardNumber: [null, Validators.required],
        image: [null, Validators.required],
        phone: [null, Validators.required],
        address: [null, Validators.required],
        membershipId: ['1', Validators.required],
      });
    }
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
      username: this.userForm.get('username').value,
      email: this.userForm.get('email').value,
      fullName: this.userForm.get('fullname').value,
      birthday: moment(this.userForm.get('birthday').value).format('DD/MM/YYYY'),
      address: this.userForm.get('address').value,
      gender: this.userForm.get('gender').value,
      idCardNumber: this.userForm.get('idCardNumber').value,
      phone: this.userForm.get('phone').value,
      image: this.userForm.get('image').value,
      membershipId: this.userForm.get('membershipId').value,
    }
    this.userProfileService.createUser(param).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message, 'success');
      this.ref.markForCheck();
      this.dialogRef.close();
    },
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message, 'danger');}
    )
  }
  unlock() {
    this.userProfileService.lock(this.data.id).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message, 'success');
      this.router.navigateByUrl('/dashboard')},
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message, 'danger');}
    )
  }
  lock() {
    this.userProfileService.lock(this.data.id).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message, 'success');
      this.router.navigateByUrl('/dashboard')},
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message, 'danger');}
    )
  }
  cancel() {
    this.dialogRef.close();
  }

  onSelectedFile(event) {
    const selectedFiles: File[] = event.target.files;
    this.exchangeService.uploadImage(selectedFiles).subscribe((val) => {
      this.userForm.patchValue({
        image: val.url
      });
      this.image = val.url
    }),
      (err) => {
      };
  }
}
