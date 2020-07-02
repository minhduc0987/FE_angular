import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-aside-user',
  templateUrl: './aside-user.component.html',
  styleUrls: ['./aside-user.component.scss']
})
export class AsideUserComponent implements OnInit {

  menuUsers: any[] = [
    {id: 1, name: 'Thông tin cá nhân', url: 'thong-tin'},
    {id: 1, name: 'Thông tin các tài khoản', url: 'accounts'},
    {id: 2, name: 'Chuyển khoản với mật khẩu', url: 'exchange-pin'},
    {id: 2, name: 'Chuyển khoản với mã OTP', url: 'exchange-otp'},
    {id: 2, name: 'Vay tiền', url: 'vay-tien'},
    {id: 3, name: 'Lịch sử giao dịch', url: 'lich-su-giao-dich'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
