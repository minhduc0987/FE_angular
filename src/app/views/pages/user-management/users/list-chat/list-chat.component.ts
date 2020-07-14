import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatUserComponent } from '../chat-user/chat-user.component';
import * as moment from 'moment';
import { NewChatComponent } from '../new-chat/new-chat.component';

@Component({
  selector: 'kt-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListChatComponent implements OnInit {
  dataSource$: Observable<any>; 
  displayedColumns = ['title', 'lastMessage','lastMessageAt', 'actions'];
  constructor(private exchangeService: ExchangeService,
    private layoutUtilsService: LayoutUtilsService,
    private userService: UserProfileService,
    private translate: TranslateService,private ref: ChangeDetectorRef,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.dataSource$ = this.exchangeService.getListChat();
  }
  view(item) {
    const dialog = this.dialog.open(ChatUserComponent, {
      data: item.conversationId,
      width: '900px',
    })
    dialog.afterClosed().subscribe(()=> {
      this.dataSource$ = this.exchangeService.getListChat();
      this.ref.markForCheck()
    })
  }

  getTime(time) {
    return moment(time).format('YYYY/MM/DD hh:mm:ss');
  }

  create() {
    const dialog = this.dialog.open(NewChatComponent, {
      width: '600px'
    })
    dialog.afterClosed().subscribe(()=>{
      this.dataSource$ = this.exchangeService.getListChat();
      this.ref.markForCheck()
    })
  }
}
