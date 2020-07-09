import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-aside',
  templateUrl: './aside-user.component.html',
  styleUrls: ['./aside-user.component.scss']
})
export class Aside1Component implements OnInit {

  menuUsers: any[] = [
  ]
  constructor(private translate: TranslateService,) { }

  ngOnInit(): void {
    this.menuUsers = [
      {id: 1, name: 'Danh sách user', url: 'list-user'},
      {id: 1, name: 'Danh sách giao dịch', url: 'list-transaction'},
      {id: 2, name: 'Danh sách vay tiền', url: 'list-hsvt'},
      {id: 2, name: 'Rút séc', url: 'rut-sec'},
    ]
  }

}
