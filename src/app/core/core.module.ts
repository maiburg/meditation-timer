import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SERVICES } from '@core/services';

@NgModule({
  providers: [...SERVICES]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been instantiated. Import CoreModule into AppModule only.');
    }
  }
}
