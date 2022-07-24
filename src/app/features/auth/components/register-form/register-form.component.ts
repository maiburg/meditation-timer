import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { PtRegisterModel } from '@core/models/domain';

@Component({
  selector: 'pt-register-form',
  templateUrl: 'register-form.component.pug',
  styleUrls: ['register-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @Output() registerInitiated = new EventEmitter<PtRegisterModel>();

  email: string;
  password: string;
  fullName: string;

  constructor() {}

  onRegisterTap(isValid: boolean) {
    if (isValid) {
      const registerModel: PtRegisterModel = {
        username: this.email,
        password: this.password,
        fullName: this.fullName
      };
      this.registerInitiated.emit(registerModel);
    }
  }
}
