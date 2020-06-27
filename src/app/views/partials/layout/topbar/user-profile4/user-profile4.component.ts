// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { Logout, User } from '../../../../../core/auth';
import { UserProfileService } from '../../../../../core/apps/_services/user-profile.service';

@Component({
  selector: 'kt-user-profile4',
  templateUrl: './user-profile4.component.html',
  styleUrls: ['./user-profile4.component.scss'],
  providers: [UserProfileService]
})
export class UserProfile4Component implements OnInit {
  // Public properties
  user$: Observable<User>;

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

  /**
   * Component constructor
   *
   * @param store: Store<AppState>
   */
  constructor(private store: Store<AppState>,
    private userProfileService: UserProfileService
    ) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.user$ = this.userProfileService.getUserProfile();
    // this.user$ = this.store.pipe(select(currentUser));
    // console.log(this.user$)
  }

  /**
   * Log out
   */
  logout() {
    this.store.dispatch(new Logout());
  }

  userDetail() {
    // let id = this._user.id
    return `user-detail/`
  }
}
