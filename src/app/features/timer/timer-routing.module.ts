import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { TimerPresettingDialogComponent, TimerPresettingsComponent } from '@app/features/timer/components';
import { TimerResolver } from '@app/features/timer/services';

console.log('TimerRoutingModule loaded');

const timerRoutes: Routes = [
  {
    path: '',
    component: TimerPresettingsComponent,
    resolve: {
      presettings: TimerResolver
    }
  },
  {
    path: ':timerId',
    component: TimerPresettingDialogComponent,
    resolve: {
      presetting: TimerResolver
    }
  },
  {
    path: 'add',
    component: TimerPresettingDialogComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(timerRoutes)],
  exports: [NativeScriptRouterModule],
  providers: [TimerResolver]
})
export class TimerRoutingModule {
  constructor() {
    console.log('TimerRoutingModule constructed');
  }
}
