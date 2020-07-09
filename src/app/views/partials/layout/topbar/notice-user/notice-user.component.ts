import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../../../../core/apps/_services/exchange.service'

@Component({
  selector: 'kt-notice-user',
  templateUrl: './notice-user.component.html',
  styleUrls: ['./notice-user.component.scss']
})
export class NoticeUserComponent implements OnInit {
  notice = 0;
  constructor(
    private exchangeService: ExchangeService
  ) { }

  ngOnInit(): void {
    this.exchangeService.getNotice().subscribe(val=> {
      this.notice = val.message
    })
  }
}
