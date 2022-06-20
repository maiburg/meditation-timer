import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/timerPresettings',
    pathMatch: 'full'
  },
  {
    path: 'timerPresettings',
    loadChildren: () => import('@app/features/timer/timer.module').then(m => m.TimerModule)
  },
  {
    path: '**',
    redirectTo: '/timerPresettings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'corrected'
    })
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
