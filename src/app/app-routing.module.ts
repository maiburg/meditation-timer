import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

console.log('AppRoutingModule loaded');

const routes: Routes = [
  { path: '', redirectTo: '/backlog/open', pathMatch: 'full' },
  { path: 'backlog', redirectTo: '/backlog/open', pathMatch: 'full' },
  { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('AppRoutingModule constructed');
  }
}
