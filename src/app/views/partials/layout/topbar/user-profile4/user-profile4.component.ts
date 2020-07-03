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
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-user-profile4',
  templateUrl: './user-profile4.component.html',
  styleUrls: ['./user-profile4.component.scss'],
  providers: [UserProfileService],
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
        localStorage.setItem('user', JSON.stringify(user));
      },
      (err) => {
        localStorage.removeItem(environment.authTokenKey);
        localStorage.removeItem('login');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
        // document.location.reload();
      },
    );
    if (localStorage.getItem(environment.authTokenKey)) {
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
    localStorage.removeItem(environment.authTokenKey);
    localStorage.removeItem('login');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }

  login() {
    this.router.navigateByUrl('/auth/login');
  }
}
