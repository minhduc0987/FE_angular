import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserProfileService } from 'src/app/core/apps';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth';

@Component({
  selector: 'kt-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [UserProfileService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements OnInit {

  user$: Observable<User>;
  constructor(private userProfileService: UserProfileService) { }
  ngOnInit(): void {
    this.user$ = this.userProfileService.getUserProfile();
  }

}
