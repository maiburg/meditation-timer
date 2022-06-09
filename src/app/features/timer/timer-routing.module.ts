import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { TimerDialogComponent, TimerListComponent } from '@app/features/timer/components';
import { TimerResolver } from '@app/features/timer/services';

const timerRoutes: Routes = [
  {
    path: '',
    component: TimerListComponent,
    resolve: {
      timer: TimerResolver
    }
  },
  {
    path: ':timerId',
    component: TimerDialogComponent,
    resolve: {
      timer: TimerResolver
    }
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(timerRoutes)],
  exports: [NativeScriptRouterModule],
  providers: [TimerResolver]
})
export class TimerRoutingModule {}
