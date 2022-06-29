import { InjectionToken, NgModule } from '@angular/core';

import { AppConfig } from '@core/models/core';
import { StorageNsService, StorageWebService } from '@core/services';
import { StorageService } from '@core/services/storage/storage.service';
import { environment } from '@src/environments/environment';

const appConfig = <AppConfig>require(environment.appConfigFile);

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

appConfig.storageServiceClass = appConfig.appType === 'Ns' ? StorageNsService : StorageWebService;

@NgModule({
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    { provide: StorageService, useClass: appConfig.storageServiceClass }
  ]
})
export class AppConfigModule {}
