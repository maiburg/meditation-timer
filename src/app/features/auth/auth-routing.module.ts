import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from '@nativescript/angular';

import { AuthContainerComponent } from '@features/auth/containers';
import { LoginPageComponent, RegisterPageComponent } from '@features/auth/pages';

console.log('AuthRoutingModule loaded');

const routes: Routes = [
  {
    path: 'auth',
    component: AuthContainerComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule {
  constructor() {
    console.log('AuthRoutingModule constructed');
  }
}
