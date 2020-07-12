import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExchangeService } from 'src/app/core/apps';

@Component({
  selector: 'kt-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss']
})
export class NewChatComponent implements OnInit {
  title;
  question;
  constructor(public dialogRef: MatDialogRef<NewChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private exchangeService: ExchangeService,) { }

  ngOnInit(): void {
  }
  submit() {
    const param = {

    }
    this.exchangeService.getChat
  }
}
