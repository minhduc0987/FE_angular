import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { ExchangeService } from 'src/app/core/apps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'kt-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatUserComponent implements OnInit {
  dataItem;
  mess;
  constructor(
    private exchangeService: ExchangeService,
    private ref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ChatUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.getChat();
  }

  getChat() {
    this.exchangeService.getChat(this.data).subscribe((val) => {
      this.dataItem = val;
      setTimeout(()=>{
        this.getChat()
      },3000)
      this.ref.markForCheck();
    });
  }
  chat() {
    const param = {
      message: this.mess
    }
    this.exchangeService.chat(param ,this.data).subscribe(() => {
      this.mess = '';
      this.getChat()
    });
  }
}
