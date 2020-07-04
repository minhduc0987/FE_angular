// Angular
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { Logout, User } from '../../../../../core/auth';
import { UserProfileService } from '../../../../../core/apps/_services/user-profile.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-user-profile4',
  templateUrl: './user-profile4.component.html',
  styleUrls: ['./user-profile4.component.scss'],
  providers: [UserProfileService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfile4Component implements OnInit {
  // Public properties
  user$: Observable<User>;

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;
  isHasLogin: boolean;

  /**
   * Component constructor
   *
   * @param store: Store<AppState>
   */
  constructor(
    private store: Store<AppState>,
    private userProfileService: UserProfileService,
    private router: Router,
    private translate: TranslateService,
    private ref: ChangeDetectorRef,
  ) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  async ngOnInit(): Promise<void> {
    this.user$ = await this.userProfileService.getUserProfile();
    this.user$.subscribe(
      (user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.ref.markForCheck();
      },
      (err) => {
        sessionStorage.removeItem(environment.authTokenKey);
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
        // document.location.reload();
      }
    );
    if (sessionStorage.getItem(environment.authTokenKey)) {
      this.isHasLogin = true;
    } else {
      this.isHasLogin = false;
    }
  }

  /**
   * Log out
   */
  logout() {
    // this.store.dispatch(new Logout());
    sessionStorage.removeItem(environment.authTokenKey);
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }

  login() {
    this.router.navigateByUrl('/auth/login');
  }
}
