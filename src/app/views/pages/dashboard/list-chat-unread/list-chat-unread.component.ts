import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatUserComponent } from '../chat-user/chat-user.component';
import * as moment from 'moment';

@Component({
  selector: 'kt-list-chat-unread',
  templateUrl: './list-chat-unread.component.html',
  styleUrls: ['./list-chat-unread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListChatUnreadComponent implements OnInit {
  dataSource$: Observable<any>;
  isDisabled = false;
  select = 'Danh sách tin nhắn chưa đọc';
  form1 = [{value: 'Danh sách tin nhắn chưa đọc'}, {value: 'Danh sách tin nhắn đã đọc'}];
  displayedColumns = ['title', 'lastMessage', 'lastMessageAt', 'actions'];
  constructor(
    private exchangeService: ExchangeService,
    private layoutUtilsService: LayoutUtilsService,
    private userService: UserProfileService,
    private translate: TranslateService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('user')).roles[0].name;
    if(role != 'ROLE_EMPLOYEE') {
      this.isDisabled = true;
    }
    this.getData();
  }
  view(item) {
    const dialog = this.dialog.open(ChatUserComponent, {
      data: item.conversationId,
      width: '900px',
    });
    dialog.afterClosed().subscribe(() => {
      this.getData()
      this.ref.markForCheck();
    });
  }
  getData(page?) {
    if (this.select === 'Danh sách tin nhắn chưa đọc') {
      if(page) {
        this.dataSource$ = this.exchangeService.getListChat3(page);
      } else {
        this.dataSource$ = this.exchangeService.getListChat3();
      }
    } else {
      if(page) {
        this.dataSource$ = this.exchangeService.getListChat3(page);
      } else {
        this.dataSource$ = this.exchangeService.getListChat3();
      }
    }
  }
  change() {
    this.getData()
  }

  getTime(time) {
    return moment(time).format('YYYY/MM/DD hh:mm:ss');
  }
  setItems(event) {
    const page = event.pageIndex + 1;
    this.getData(page)
    this.ref.markForCheck();
  }
}