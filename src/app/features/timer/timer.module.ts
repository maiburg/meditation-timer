import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import * as fromComponents from '@app/features/timer/components';
import { TimerFacade as Facade } from '@app/features/timer/services/timer.facade';
import { TimerRoutingModule } from '@app/features/timer/timer-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, TimerRoutingModule],
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
