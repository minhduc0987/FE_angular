import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ExchangeService } from '../../../../../core/apps/_services/exchange.service'

@Component({
  selector: 'kt-notice-user',
  templateUrl: './notice-user.component.html',
  styleUrls: ['./notice-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeUserComponent implements OnInit {
  notice = 0;
  constructor(
    private exchangeService: ExchangeService,
    private ref: ChangeDetectorRef,
    
  ) { }

  ngOnInit(): void {
    this.getMess();
  }

  getMess() {
    this.exchangeService.getNotice().subscribe(val=> {
      this.notice = val.message;
      this.ref.markForCheck();
      setTimeout(()=>{
        this.getMess()
      },3000)
    })
  }
}
