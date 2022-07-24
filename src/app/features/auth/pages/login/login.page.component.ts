import { Component } from '@angular/core';

import { AuthService, NavigationService } from '@core/services';
import { PtLoginModel } from '@core/models/domain';

@Component({
  selector: 'pt-login-page',
  templateUrl: 'login.page.component.pug',
  styleUrls: ['login.page.component.sass']
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private navigationService: NavigationService) {}

  onLogin(loginModel: PtLoginModel) {
    this.authService
      .login(loginModel)
      .subscribe(() => this.navigationService.navigate(['/backlog'], { clearHistory: true }));
  }
}
