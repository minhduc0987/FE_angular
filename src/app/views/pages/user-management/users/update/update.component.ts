import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserProfileService } from 'src/app/core/apps';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'kt-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [UserProfileService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements OnInit {
  formId: FormGroup;
  user$: Observable<User>;
  constructor(private userProfileService: UserProfileService,
    private _formBuilder: FormBuilder,
    ) { }
  ngOnInit(): void {
    this.user$ = this.userProfileService.getUserProfile();
    this.formId = this._formBuilder.group({
      note: ['', Validators.required],
    });
  }

}
