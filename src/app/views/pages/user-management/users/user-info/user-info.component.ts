import { AfterViewInit, AfterViewChecked } from '@angular/core';
// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
// LODASH
import { each, find } from 'lodash';
// NGRX
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
// Models
import { UsersDataSource, User } from '../../../../../core/auth';
import { UserProfileService } from '../../../../../../app/core/apps/_services/user-profile.service';

@Component({
  selector: 'kt-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [UserProfileService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit, OnDestroy {
  // Table fields
  dataSource: UsersDataSource;
  displayedColumns = ['select', 'id', 'username', 'email', 'fullname', '_roles', 'actions'];
  user: User;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.userProfileService.getUserProfile().subscribe((user: User) => {
	  this.user = user;
	  console.log(this.user);
    });
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {}
}
