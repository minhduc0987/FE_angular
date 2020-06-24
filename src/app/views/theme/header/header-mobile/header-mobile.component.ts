// Angular
import { Component, OnInit } from '@angular/core';
// Layout
import { HtmlClassService } from '../../html-class.service';
import { LayoutConfigService, ToggleOptions } from '../../../../core/_base/layout';

@Component({
  selector: 'kt-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent implements OnInit {
  // Public properties
  asideSelfDisplay = true;
  headerMenuSelfDisplay = true;
  headerMobileClasses = '';

  toggleOptions: ToggleOptions = {
    target: KTUtil.getBody(),
    targetState: 'topbar-mobile-on',
    toggleState: 'active'
  };

  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   */
  constructor(private layoutConfigService: LayoutConfigService, private uiService: HtmlClassService) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.headerMobileClasses = this.uiService.getClasses('header_mobile', true).toString();
    this.asideSelfDisplay = this.layoutConfigService.getConfig('aside.self.display');
    this.headerMenuSelfDisplay = this.layoutConfigService.getConfig('header.menu.self.display');
  }

}
