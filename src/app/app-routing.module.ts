import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const appRoutes: Routes = [{ path: '', redirectTo: '/', pathMatch: 'full' }];

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
