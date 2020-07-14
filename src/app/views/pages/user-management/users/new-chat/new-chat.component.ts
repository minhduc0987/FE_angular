import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExchangeService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';

@Component({
  selector: 'kt-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss'],
})
export class NewChatComponent implements OnInit {
  title;
  question;
  constructor(
    public dialogRef: MatDialogRef<NewChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exchangeService: ExchangeService,
    private layoutUtilsService: LayoutUtilsService,
  ) {}

  ngOnInit(): void {}
  submit() {
    const param = {
      title: this.title,
      message: this.question
    };
    this.exchangeService.newChat(param).subscribe(() => {
      const message = 'Đặt câu hỏi thành công';
      this.layoutUtilsService.showActionNotification(message, 'success');
      this.cancel();
    });
  }
  cancel() {
    this.dialogRef.close();
  }
}
