import { Component } from '@angular/core';

import { Page } from '@nativescript/core';

@Component({
  selector: 'pt-auth-container',
  templateUrl: 'auth.container.component.pug',
  styleUrls: ['auth.container.component.sass']
})
export class AuthContainerComponent {
  constructor(private page: Page) {
    this.page.actionBarHidden = true;
    this.page.backgroundSpanUnderStatusBar = true;
  }
}
