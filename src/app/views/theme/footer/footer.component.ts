// Angular
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// Layout
import { HtmlClassService } from '../html-class.service';
// Object-Path
import * as objectPath from 'object-path';

@Component({
  selector: 'kt-footer',
  templateUrl: './footer.component.html',changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  // Public properties
  today: number = Date.now();
  footerClasses = '';
  footerContainerClasses = '';

  /**
   * Component constructor
   *
   * @param uiClasses: HtmlClassService
   */
  constructor(private uiClasses: HtmlClassService,private ref: ChangeDetectorRef,) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.footerClasses = this.uiClasses.getClasses('footer', true).toString();
    this.footerContainerClasses = this.uiClasses.getClasses('footer_container', true).toString();
    this.setTime()
  }

  setTime() {
    this.today = Date.now();
    this.ref.markForCheck()
    setTimeout(()=>{
      this.setTime()
    },1000)
  }
}
