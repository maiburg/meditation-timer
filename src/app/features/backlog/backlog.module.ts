import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { COMPONENTS } from '@features/backlog/components';
import { PAGES } from '@features/backlog/pages';
import { BacklogRepository } from '@features/backlog/repositories';
import { BacklogService } from '@features/backlog/services';

@NgModule({
  imports: [
    NativeScriptModule
    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: translationHttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }
  ],
  exports: [...PAGES],
  declarations: [...PAGES, ...COMPONENTS],
  providers: [BacklogService, BacklogRepository],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BacklogModule {}
