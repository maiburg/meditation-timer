import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular';

import { AppComponent } from './app.component';

import { TimerAddEditComponent } from './timer/timer-add-edit/timer-add-edit.component';
import { TimerListComponent } from './timer/timer-list/timer-list.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptFormsModule],
  declarations: [AppComponent, TimerAddEditComponent, TimerListComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
