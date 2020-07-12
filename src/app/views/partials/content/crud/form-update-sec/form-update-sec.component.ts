import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileService, ExchangeService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-form-update-sec',
  templateUrl: './form-update-sec.component.html',
  styleUrls: ['./form-update-sec.component.scss'],
})
export class FormUpdateSecComponent implements OnInit {
  userForm: FormGroup;
  isDisable = false;
  isCancel = false;
  constructor(
    public dialogRef: MatDialogRef<FormUpdateSecComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userFB: FormBuilder,
    private userProfileService: UserProfileService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private exchangeService: ExchangeService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    if (this.data && !this.data.item.cheque.status) {
      this.isCancel = true;
    }
    this.createForm();
  }

  createForm() {
    if (this.data) {
      this.userForm = this.userFB.group({
        fullname: [{ value: this.data.item.cheque.recieverFullname, disabled: this.isDisable }, Validators.required],
        cmnd: [{ value: this.data.item.cheque.recieverIdCardNumber, disabled: this.isDisable }, Validators.required],
        money: [{ value: this.data.item.cheque.transactionAmount, disabled: this.isDisable }, Validators.required],
      });
    } else {
      this.userForm = this.userFB.group({
        fullname: [null, Validators.required],
        cmnd: [null, Validators.required],
        money: [null, Validators.required],
      });
    }
  }
  cancel() {
    this.dialogRef.close();
  }
  cancelSec() {
    const comfirm = this.layoutUtilsService.deleteElement('Huỷ séc', 'Bạn chắc chắn muốn huỷ tờ séc này?');
    comfirm.afterClosed().subscribe((val) => {
      if (val) {
        const userId = localStorage.getItem('userId');
        const Accid = this.data.item.cheque.account.id;
        const id = this.data.item.cheque.id;
        this.exchangeService.deleteSec(userId, Accid, id).subscribe(
          (val) => {
            const message = 'Huỷ séc thành công';
            this.layoutUtilsService.showActionNotification(message, 'danger');
            this.dialogRef.close(true);
          },
          (val) => {
            const message = this.translate.instant('ERROR');
            this.layoutUtilsService.showActionNotification(message, 'danger');
          },
        );
      }
    });
  }
  submit() {
    const comfirm = this.layoutUtilsService.deleteElement('Cập nhật séc', 'Bạn chắc chắn muốn cập nhật?');
    comfirm.afterClosed().subscribe((val) => {
      if (val) {
        const param = {
          chequeId: this.data.item.cheque.id,
          recieverFullname: this.userForm.get('fullname').value,
          recieverIdCardNumber: this.userForm.get('cmnd').value,
          transactionAmount: this.userForm.get('money').value,
        };
        this.exchangeService.updateSec(param).subscribe(
          (val) => {
            const message = this.translate.instant('SUCCESS');
            this.layoutUtilsService.showActionNotification(message, 'danger');
            this.dialogRef.close(true);
          },
          (val) => {
            const message = this.translate.instant('ERROR');
            this.layoutUtilsService.showActionNotification(message, 'danger');
          },
        );
      }
    });
  }
}
