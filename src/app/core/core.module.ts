import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Page } from '@nativescript/core';

import { SERVICES } from '@core/services';

console.log('CoreModule loaded');

@NgModule({
  providers: [...SERVICES, Page]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    console.log('CoreModule constructed');

    if (parentModule) {
      throw new Error('CoreModule has already been instantiated. Import CoreModule into AppModule only.');
    }
  }
}
