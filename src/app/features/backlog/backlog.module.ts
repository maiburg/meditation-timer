import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';

import { COMPONENTS } from '@features/backlog/components';
import { BacklogRoutingModule } from '@features/backlog/backlog-routing.module';
import { PAGES } from '@features/backlog/pages';
import { BacklogRepository } from '@features/backlog/repositories';
import { BacklogService } from '@features/backlog/services';
import { SharedModule } from '@shared/shared.module';

console.log('BacklogModule loaded');

@NgModule({
  imports: [NativeScriptModule, NativeScriptRouterModule, BacklogRoutingModule, SharedModule],
  exports: [...PAGES],
  declarations: [...PAGES, ...COMPONENTS],
  providers: [BacklogRepository, BacklogService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BacklogModule {
  constructor() {
    console.log('BacklogModule constructed');
  }
}
