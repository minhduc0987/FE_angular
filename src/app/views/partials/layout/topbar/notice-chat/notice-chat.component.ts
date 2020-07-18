import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ExchangeService } from 'src/app/core/apps';

@Component({
  selector: 'kt-notice-chat',
  templateUrl: './notice-chat.component.html',
  styleUrls: ['./notice-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeChatComponent implements OnInit {
  notice = 0;
  constructor(
    private exchangeService: ExchangeService,private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getMess();
  }

  getMess() {
    this.exchangeService.getNoticeChat().subscribe(val=> {
      this.notice = val.message;
      this.ref.markForCheck();
      setTimeout(()=>{
        this.getMess()
      },3000)
    })
  }
}
