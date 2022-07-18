import { Component } from '@angular/core';

import { PtLoginModel, PtUser } from '@core/models/domain';
import { AuthService } from '@core/services';

@Component({
  selector: 'pt-auth-page',
  templateUrl: './auth.page.component.pug'
})
export class AuthPageComponent {
  public loggedIn = false;
  public loggedInName = '';

  constructor(private authService: AuthService) {}

  public onLogin(loginModel: PtLoginModel) {
    this.authService.login(loginModel).subscribe((user: PtUser) => {
      this.loggedIn = true;

      if (user) {
        this.loggedInName = user.fullName;
      }
      // TODO: navigate to the backlog
    });
  }

  public logout() {
    this.authService.logout();
    this.loggedIn = false;
    // TODO: navigate to the login page
  }
}
