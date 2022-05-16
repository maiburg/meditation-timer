import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular';

import * as fromComponents from '@app/features/timer/components';
import { TimerFacade as Facade } from '@app/features/timer/timer.facade';

@NgModule({
  imports: [NativeScriptModule, NativeScriptFormsModule, CommonModule],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TimerModule {
  static forRoot(): ModuleWithProviders<TimerModule> {
    return {
      ngModule: TimerModule,
      providers: [Facade]
    };
  }
}
