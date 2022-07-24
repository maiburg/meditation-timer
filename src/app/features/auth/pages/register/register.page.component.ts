import { Component } from '@angular/core';

import { AuthService, NavigationService } from '@core/services';
import { PtRegisterModel } from '@core/models/domain';

@Component({
  selector: 'pt-register-page',
  templateUrl: 'register.page.component.pug',
  styleUrls: ['register.page.component.sass']
})
export class RegisterPageComponent {
  constructor(private authService: AuthService, private navigationService: NavigationService) {}

  onRegister(registerModel: PtRegisterModel) {
    this.authService
      .register(registerModel)
      .subscribe(() => this.navigationService.navigate(['/backlog'], { clearHistory: true }));
  }
}
