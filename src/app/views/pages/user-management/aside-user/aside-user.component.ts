import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-aside-user',
  templateUrl: './aside-user.component.html',
  styleUrls: ['./aside-user.component.scss']
})
export class AsideUserComponent implements OnInit {

  menuUsers: any[] = [
  ]
  constructor(private translate: TranslateService,) { }

  ngOnInit(): void {
    this.menuUsers = [
      {id: 1, name: this.translate.instant('INFO'), url: 'thong-tin'},
      {id: 1, name: this.translate.instant('INFOS'), url: 'accounts'},
      {id: 2, name: this.translate.instant('EXCHANGE.SEC'), url: 'exchange-sec'},
      {id: 2, name: this.translate.instant('EXCHANGE.SEC_HISTORY'), url: 'exchange-sec-history'},
      {id: 2, name: this.translate.instant('EXCHANGE.EXCHANGE'), url: 'exchange-otp'},
      {id: 3, name: this.translate.instant('EXCHANGE.HISTORY'), url: 'lich-su-giao-dich'},
      {id: 2, name: this.translate.instant('EXCHANGE.VAY'), url: 'vay-tien'},
      {id: 2, name: this.translate.instant('EXCHANGE.CHAT'), url: 'hoi-dap'},
    ]
  }

}
