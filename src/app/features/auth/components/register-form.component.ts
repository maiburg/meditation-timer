import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pt-register-form',
  templateUrl: './register-form.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {}
