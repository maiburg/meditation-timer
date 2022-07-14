import { NgModule } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { BacklogRepository } from '@features/backlog/repositories';
import { BacklogService } from '@features/backlog/services';

@NgModule({
  imports: [NativeScriptModule],
  exports: [],
  declarations: [],
  providers: [BacklogService, BacklogRepository]
})
export class BacklogModule {}
