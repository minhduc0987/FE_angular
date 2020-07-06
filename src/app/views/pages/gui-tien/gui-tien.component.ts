import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-gui-tien',
  templateUrl: './gui-tien.component.html',
  styleUrls: ['./gui-tien.component.scss']
})
export class GuiTienComponent implements OnInit {
  formId: FormGroup;
  account = [];
  constructor(private _formBuilder: FormBuilder,
    private exchangeService: ExchangeService,
    private userProfileService: UserProfileService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const id = JSON.parse(sessionStorage.getItem('userSearch')).id;
    this.exchangeService.getUserIn(id).subscribe(val=>this.account = val);
    this.formId = this._formBuilder.group({
      idBank: ['', Validators.required],
      money: ['', Validators.required],
      note: ['', Validators.required],
    });
  }

  submit2() {
    const id = JSON.parse(sessionStorage.getItem('userSearch')).id;
    const param = {
      userId: id,
      accountId: this.formatNumber2(this.formId.get('idBank').value),
      amount: this.formatNumber2(this.formId.get('money').value)
    }
    this.userProfileService.guitien(param).subscribe(
      val=>{const message = 'Thành công';
      this.layoutUtilsService.showActionNotification(message);
      this.router.navigateByUrl('./dashboard')
    },
      err=>{const message = 'Có lỗi vui lòng thao tác lại';
      this.layoutUtilsService.showActionNotification(message);}
    )
  }

  onKeyMoney() {
    this.formId.patchValue({
      money: this.formatNumber(this.formId.get('money').value)
    })
  }

  onKeyBank() {
    this.formId.patchValue({
      idBank: this.formatNumber1(this.formId.get('idBank').value)
    })
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

}
