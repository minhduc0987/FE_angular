import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-gui-tien',
  templateUrl: './gui-tien.component.html',
  styleUrls: ['./gui-tien.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuiTienComponent implements OnInit {
  formId: FormGroup;
  account = [];
  userId;
  constructor(
    private _formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private userProfileService: UserProfileService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      stk: ['', Validators.required],
      idBank: ['', Validators.required],
      money: ['', Validators.required],
    });
    this.formId.get('stk').valueChanges.subscribe((val) => {
      if (val && val.length == 12) {
        this.searchUser(val);
      }
    });
  }

  searchUser(val) {
    const params = {
      term: val,
      type: 'IDCARDNUMBER',
    };
    this.userProfileService.getUser(params).subscribe(
      (val: any) => {
        this.getAccount(val.id);
        this.userId = val.id;
      },
      (err) => {
        const message = this.translate.instant('NOT_FIND_USER');
        this.layoutUtilsService.showActionNotification(message, 'danger');
      },
    );
  }

  getAccount(id) {
    this.exchangeService.getUserIn(id).subscribe((val) => {
      this.account = val;
      this.ref.markForCheck();
    });
  }

  submit2() {
    const controls = this.formId.controls;
		/** check form */
		if (this.formId.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
      );
      const message = 'Vui lòng điền hết các trường';
      this.layoutUtilsService.showActionNotification(message, 'danger');
			return;
		}
    this.layoutUtilsService.deleteElement('Chuyển tiền', 'Xác nhận chuyển tiền vào tài khoản').afterClosed().subscribe(
      val=> {
        if(val) {
          const param = {
            userId: this.userId,
            accountId: this.formatNumber2(this.formId.get('idBank').value),
            amount: this.formatNumber2(this.formId.get('money').value),
          };
          this.userProfileService.guitien(param).subscribe(
            (val) => {
              const message = 'Thành công';
              this.layoutUtilsService.showActionNotification(message, 'success');
              this.router.navigateByUrl('./dashboard');
            },
            (err) => {
              const message = 'Có lỗi vui lòng thao tác lại';
              this.layoutUtilsService.showActionNotification(message, 'danger');
            },
          );
        }
      }
    )
  }

  onKeyMoney() {
    this.formId.patchValue({
      money: this.formatNumber(this.formId.get('money').value),
    });
  }

  onKeyBank() {
    this.formId.patchValue({
      idBank: this.formatNumber1(this.formId.get('idBank').value),
    });
  }

  formatNumber(n: any) {
    if (n !== null) {
      return n
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  formatNumber1(n: any) {
    if (n !== null) {
      return n
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
  }
  formatNumber2(n: any) {
    if (n !== null) {
      return n.toString().replace(/\,/g, '');
    }
  }
  formatNumber3(n: any) {
    if (n !== null) {
      return n.toString().replace(/\ /g, '');
    }
  }

  cancel() {}
}
