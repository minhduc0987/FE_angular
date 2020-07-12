import { Component, OnInit } from '@angular/core';
import { ExchangeService } from 'src/app/core/apps';

@Component({
  selector: 'kt-notice-chat',
  templateUrl: './notice-chat.component.html',
  styleUrls: ['./notice-chat.component.scss']
})
export class NoticeChatComponent implements OnInit {
  notice = 0;
  constructor(
    private exchangeService: ExchangeService
  ) { }

  ngOnInit(): void {
    this.getMess();
  }

  getMess() {
    this.exchangeService.getNoticeChat().subscribe(val=> {
      this.notice = val.message;
      setTimeout(()=>{
        this.getMess()
      },3000)
    })
  }
}
