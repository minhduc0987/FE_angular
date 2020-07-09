import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormTstcDialogComponent } from '..';

@Component({
  selector: 'kt-inpit-otp',
  templateUrl: './inpit-otp.component.html',
  styleUrls: ['./inpit-otp.component.scss']
})
export class InpitOtpComponent implements OnInit {
  viewLoading = false;
  formId: FormGroup;
  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
   * @param data: any
   */
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InpitOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.formId = this._formBuilder.group({
      otp: ['', Validators.required],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Close dialog with true result
   */
  onYesClick(): void {
	this.dialogRef.close(this.formId.get('otp').value);
  }
}
