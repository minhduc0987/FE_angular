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
    {id: 2, name: 'Chuyển khoản trong ngân hàng', url: 'giao-dich-noi-bo'},
    {id: 2, name: 'Chuyển khoản ngoài ngân hàng', url: 'giao-dich-khac-ngan-hang'},
    {id: 2, name: 'Chuyển khoản nhanh liên ngân hàng', url: 'giao-dich-nhanh'},
    {id: 3, name: 'Lịch sử giao dịch', url: 'lich-su-giao-dich'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
