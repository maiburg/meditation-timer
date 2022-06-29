import { Inject, Injectable } from '@angular/core';

import { AppConfig } from '@core/models/core';
import { APP_CONFIG } from '@src/config/app-config.module';

@Injectable()
export class AuthService {
  private get loginUrl() {
    return `${this.config.apiEndpoint}/auth`;
  }
  private get registerUrl() {
    return `${this.config.apiEndpoint}/register`;
  }

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}
}
