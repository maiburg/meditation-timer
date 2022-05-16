import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { TimerAddEditComponent, TimerListComponent } from '@app/features/timer/components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'TimerListComponent',
        pathMatch: 'full'
      },
      {
        path: 'TimerListComponent',
        component: TimerListComponent
      },
      {
        path: 'TimerAddEditComponent',
        component: TimerAddEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
