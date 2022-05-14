import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular';

import { TimerFacade } from '@app/features/timer/timer.facade';
import { TimerListComponent } from '@app/features/timer/timer-list/timer-list.component';
import { TimerAddEditComponent } from '@app/features/timer/timer-add-edit/timer-add-edit.component';

@NgModule({
  imports: [NativeScriptModule, NativeScriptFormsModule, CommonModule],
  declarations: [TimerListComponent, TimerAddEditComponent],
  exports: [TimerListComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TimerModule {
  static forRoot(): ModuleWithProviders<TimerModule> {
    return {
      ngModule: TimerModule,
      providers: [TimerFacade]
    };
  }
}
