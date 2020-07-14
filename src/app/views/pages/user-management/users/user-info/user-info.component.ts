// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
// Models
import { UserProfileService } from '../../../../../../app/core/apps/_services/user-profile.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [UserProfileService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit, OnDestroy {
  // Table fields
  dataSource: any;
  displayedColumns = ['select', 'id', 'username', 'email', 'fullname', '_roles', 'actions'];
  user$: Observable<User>;

  constructor(private userProfileService: UserProfileService,private router: Router,) {}

  ngOnInit() {
    this.user$ = this.userProfileService.getUserProfile();
  }
  /**
   * On Destroy
   */
  ngOnDestroy() {}

  update() {
    this.router.navigateByUrl('/user-detail/update');
  }

  getGt(item) {
    if(item === 'male') {
      return 'Nam'
    }
    return 'Nữ'
  }
}