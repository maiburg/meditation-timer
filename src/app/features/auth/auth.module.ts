import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService, StoreService } from '@core/services';
import { COMPONENTS } from '@features/auth/components';
import { PAGES } from '@features/auth/pages';

@NgModule({
  imports: [NativeScriptModule, NativeScriptFormsModule, NativeScriptRouterModule, TranslateModule.forChild()],
  exports: [...PAGES],
  declarations: [...PAGES, ...COMPONENTS],
  providers: [AuthService, StoreService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
