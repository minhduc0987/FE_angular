// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExchangeService } from 'src/app/core/apps';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService } from 'src/app/core/_base/crud';

@Component({
  selector: 'kt-form-tstc-dialog',
  templateUrl: './form-tstc-dialog.component.html',
  styleUrls: ['./form-tstc-dialog.component.scss'],
})
export class FormTstcDialogComponent implements OnInit {
  // Public properties
  viewLoading = false;
  formId: FormGroup;
  listImages = [];
  file: any;
  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
   * @param data: any
   */
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormTstcDialogComponent>,
    private exchangeService: ExchangeService,
    private translate: TranslateService,
    private layoutUtilsService: LayoutUtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.formId = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      image: [null],
    });
  }

  /**
   * Close dialog with false result
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Close dialog with true result
   */
  onYesClick(): void {
    const params = {
		name: this.formId.get('name').value,
		amount: this.format2(this.formId.get('amount').value),
		description: this.formId.get('description').value,
		images: this.listImages
	}
	this.dialogRef.close(params);
  }
  onSelectedFile(event) {
    const selectedFiles: File[] = event.target.files;
    this.viewLoading = true;
    this.exchangeService.uploadImage(selectedFiles).subscribe((val) => {
      this.viewLoading = false;
      this.listImages.push(val.url);
      this.formId.patchValue({ image: null });
    }),
      (err) => {
        this.formId.patchValue({ image: null });
        const message = this.translate.instant('ERROR');
        this.layoutUtilsService.showActionNotification(message);
      };
  }
  onKeyMoney() {
    this.formId.patchValue({
      amount: this.formatNumber(this.formId.get('amount').value),
    });
  }
  formatNumber(n: any) {
    if (n !== null) {
      return n
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  format2(n: any) {
    if (n !== null) {
      return n.toString().replace(/\D/g, '');
    }
  }
}
