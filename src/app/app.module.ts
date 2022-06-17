import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { NativeScriptCommonModule, NativeScriptModule } from '@nativescript/angular';

import { AppComponent } from '@app/app.component';
import { CoreModule } from '@core/core.module';
import { TimerModule } from '@app/features/timer/timer.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptCommonModule, AppRoutingModule, CoreModule, TimerModule.forRoot()],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
