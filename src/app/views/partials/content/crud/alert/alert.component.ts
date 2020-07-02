// Angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'kt-alert',
	templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
	// Public properties
	@Input() type: 'primary | accent | warn';
	@Input() duration = 0;
	@Input() showCloseButton = true;
	// tslint:disable-next-line:no-output-native
	@Output() close = new EventEmitter<boolean>();
	alertShowing = true;

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		if (this.duration === 0) {
			return;
		}

		setTimeout(() => {
			this.closeAlert();
		}, this.duration);
	}

	/**
	 * close alert
	 */
	closeAlert() {
		this.close.emit();
	}
}
