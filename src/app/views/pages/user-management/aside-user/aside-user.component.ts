import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-aside-user',
  templateUrl: './aside-user.component.html',
  styleUrls: ['./aside-user.component.scss']
})
export class AsideUserComponent implements OnInit {

  menuUsers: any[] = [
    {id: 1, name: 'Thông tin cá nhân', url: 'thong-tin'},
    {id: 1, name: 'Thông tin các tài khoản', url: 'thong-tin-account'},
    {id: 2, name: 'Chuyển khoản qua số tài khoản', url: 'exchange-account'},
    {id: 2, name: 'Chuyển khoản qua số thẻ', url: 'exchange-card'},
    {id: 2, name: 'Chuyển khoản khác ngân hàng', url: 'exchange-out'},
    {id: 3, name: 'Lịch sử giao dịch', url: 'lich-su-giao-dich'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
