import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';

import { MtErrorHandler } from '@core/helpers';
import { SERVICES } from '@core/services';

console.log('CoreModule loaded');

@NgModule({
  providers: [...SERVICES, { provide: ErrorHandler, useClass: MtErrorHandler }]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    console.log('CoreModule constructed');

    if (parentModule) {
      throw new Error('CoreModule has already been instantiated. Import CoreModule into AppModule only.');
    }
  }
}
