import { InjectionToken, NgModule } from '@angular/core';

import { AppConfig } from '@core/models/core';
import { StorageNsService, StorageService, StorageWebService } from '@core/services/storage';
import { environment } from '@src/environments/environment';

const appConfig = <AppConfig>require(`${environment.appConfigFile}`);

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

appConfig.storageServiceClass = appConfig.appType === 'Ns' ? StorageNsService : StorageWebService;

console.log('AppConfigModule loaded');

@NgModule({
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    { provide: StorageService, useClass: StorageNsService }
  ]
})
export class AppConfigModule {
  constructor() {
    console.log('AppConfigModule constructed');
  }
}
