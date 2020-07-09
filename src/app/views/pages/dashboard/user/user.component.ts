import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  isDisable = false;
  isLock = false;
  isUnLock = false;
  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userFB: FormBuilder,
    private userProfileService: UserProfileService,private layoutUtilsService: LayoutUtilsService, private router: Router,
  ) {}

  ngOnInit(): void {
    if(!this.data.locked) {
      this.isLock = true;
    } else {
      this.isUnLock = true;
    }
    this.createForm();
  }

  createForm() {
    if (this.data) {
      this.userForm = this.userFB.group({
        username: [{ value: this.data.username, disabled: true }, Validators.required],
        fullname: [{ value: this.data.fullname, disabled: this.isDisable }, Validators.required],
        email: [{ value: this.data.email, disabled: this.isDisable }, Validators.required],
        birthday: [{ value: this.data.birthday, disabled: this.isDisable }, Validators.required],
        gender: [{ value: this.data.gender, disabled: this.isDisable }, Validators.required],
        idCardNumber: [{ value: this.data.idCardNumber, disabled: this.isDisable }, Validators.required],
        image: [{ value: this.data.image, disabled: this.isDisable }, Validators.required],
        phone: [{ value: this.data.phone, disabled: this.isDisable }, Validators.required],
        address: [{ value: this.data.address, disabled: this.isDisable }, Validators.required],
        membershipId: [{ value: this.data.membership.name, disabled: this.isDisable }, Validators.required],
      });
    } else {
      this.userForm = this.userFB.group({
        username: [null, Validators.required],
        fullname: [null, Validators.required],
        email: [null, Validators.required],
        birthday: [null, Validators.required],
        gender: [null, Validators.required],
        idCardNumber: [null, Validators.required],
        image: [null, Validators.required],
        phone: [null, Validators.required],
        address: [null, Validators.required],
        membershipId: [null, Validators.required],
      });
    }
  }

  submit() {
    console.log(this.userForm.get('username').value)
    const param = {
      username: this.userForm.get('username').value,
      email: this.userForm.get('email').value,
      fullName: this.userForm.get('fullname').value,
      birthday: this.userForm.get('birthday').value,
      address: this.userForm.get('address').value,
      gender: this.userForm.get('gender').value,
      idCardNumber: this.userForm.get('idCardNumber').value,
      phone: this.userForm.get('phone').value,
      image: this.userForm.get('image').value,
      membershipId: this.userForm.get('membershipId').value,
    }
    this.userProfileService.createUser(param).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message);
      this.router.navigateByUrl('/dashboard')},
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message);}
    )
  }
  unlock() {
    this.userProfileService.lock(this.data.id).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message);
      this.router.navigateByUrl('/dashboard')},
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message);}
    )
  }
  lock() {
    this.userProfileService.lock(this.data.id).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message);
      this.router.navigateByUrl('/dashboard')},
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message);}
    )
  }
  cancel() {
    this.dialogRef.close();
  }
}
