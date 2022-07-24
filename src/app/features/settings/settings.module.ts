import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from '@features/settings/settings-routing.module';
import { SettingsComponent } from '@features/settings/settings.component';

console.log('SettingsModule loaded');

@NgModule({
  imports: [SettingsRoutingModule],
  exports: [],
  declarations: [SettingsComponent],
  providers: []
})
export class SettingsModule {
  constructor() {
    console.log('SettingsModule constructed');
  }
}
