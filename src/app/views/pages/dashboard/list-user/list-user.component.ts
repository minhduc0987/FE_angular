import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Injectable } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { ExchangeService, UserProfileService } from 'src/app/core/apps';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'kt-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUserComponent implements OnInit {
  displayedColumns = ['id', 'name', 'info', 'money', 'date1', 'date2', 'status1', 'status2'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  accountId: any;
  account$: Observable<any>;
  dataSource: any[] = [];
  pageEvent: PageEvent;
  stk;
  id;
  form1 = [
    { key: '0', value: 'Tất cả' },
    { key: 'IDCARDNUMBER', value: 'CMND/CCCD/Hộ chiếu' },
    { key: 'PHONENUMBER', value: 'Số điện thoại' },
  ];
  formId: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private exchangeService: ExchangeService,
    private userProfileService: UserProfileService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private translate: TranslateService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getListUsers();
    this.formId = this._formBuilder.group({
      id: ['12312312300', Validators.required],
      select: ['0', Validators.required],
    });
    // this.formId.get('id').valueChanges.subscribe((val) => {
    //   if (val && Number(val) && val.length === 12) {
    //     this.searchUser(val);
    //   }
    // });
  }

  searchUser() {
    if (this.formId.get('select').value === '0') {
      this.getListUsers();
    } else {
      const params = {
        term: this.formId.get('id').value,
        type: this.formId.get('select').value,
      };
      this.userProfileService.getUser(params).subscribe(
        (val: any) => {
          this.dataSource = [];
          this.dataSource.push(val);
          this.ref.markForCheck();
        },
        (err) => {
          const message = this.translate.instant('NOT_FIND_USER');
          this.layoutUtilsService.showActionNotification(message);
        },
      );
    }
  }

  updateUser(item) {
    this.dialog.open(UserComponent, {
      data: item,
      width: '900px',
      disableClose: true
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  getListUsers() {
    this.exchangeService.getListUsers().subscribe((val: any) => {
      this.dataSource = val.items;
      this.ref.markForCheck();
    });
  }

  createUser() {
    this.dialog.open(UserComponent, {
      width: '900px',
      disableClose: true
    });
  }
}
