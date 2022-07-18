import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { PtLoginModel } from '@core/models/domain';

@Component({
  selector: 'pt-login-form',
  templateUrl: './login-form.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() loginInitiated = new EventEmitter<PtLoginModel>();
  email = 'alex@email.com';
  password = 'nuvious';

  onLoginTap(isValid: boolean): void {
    if (isValid) {
      const loginModel: PtLoginModel = {
        username: this.email,
        password: this.password
      };

      this.loginInitiated.emit(loginModel);
    }
  }
}
