import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { PtLoginModel } from '@core/models/domain';

@Component({
  selector: 'pt-login-form',
  templateUrl: 'login-form.component.pug',
  styleUrls: ['login-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() loginInitiated = new EventEmitter<PtLoginModel>();

  email = 'alex@email.com';
  password = 'nuvious';

  constructor() {}

  onLoginTap(isValid: boolean) {
    if (isValid) {
      const loginModel: PtLoginModel = {
        username: this.email,
        password: this.password
      };
      this.loginInitiated.emit(loginModel);
    }
  }
}
