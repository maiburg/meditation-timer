import { HttpClient } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';

import { NativeScriptCommonModule, NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from '@app/app.component';
import { CoreModule } from '@core/core.module';
import { FEATURE_MODULES } from '@features/.';
import { AppConfigModule } from '@src/config/app-config.module';

import { translationHttpLoaderFactory } from '@app/utils';
import '@app/utils/console-color';

console.log('AppModule loaded');

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptCommonModule,
    AppRoutingModule,
    CoreModule,
    AppConfigModule,
    NativeScriptHttpClientModule,
    ...FEATURE_MODULES,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: translationHttpLoaderFactory, deps: [HttpClient] }
    })
  ],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
  constructor() {
    console.log('AppModule constructed');
  }
}
