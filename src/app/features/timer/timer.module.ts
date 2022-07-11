import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import * as fromComponents from '@app/features/timer/components';
import { TimerService } from '@app/features/timer/services';
import { TimerRoutingModule } from '@app/features/timer/timer-routing.module';

import { translationHttpLoaderFactory } from '@app/utils';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    TimerRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: translationHttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TimerModule {
  static forRoot(): ModuleWithProviders<TimerModule> {
    return {
      ngModule: TimerModule,
      providers: [TimerService]
    };
  }
}
