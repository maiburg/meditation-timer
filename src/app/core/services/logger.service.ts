import { Inject, Injectable } from '@angular/core';

import '@app/utils/console-color';
import { AppConfig, LogEntry } from '@core/models/core';
import { LoggingLevelEnum } from '@core/models/enums';
import { APP_CONFIG } from '@src/config/app-config.module';

@Injectable()
export class LoggerService {
  private logs: LogEntry[] = [];

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  log(message: string) {
    if (this.config.loggingEnabled && this.config.loggingLevel === LoggingLevelEnum.Debug) {
      this.logs.push({ message: message, level: LoggingLevelEnum.Log });
      console.logColor(message);
    }
  }

  warn(message: string) {
    if (this.config.loggingEnabled && this.config.loggingLevel === LoggingLevelEnum.Debug) {
      this.logs.push({ message: message, level: LoggingLevelEnum.Warn });
      console.warnColor(message);
    }
  }

  error(message: string) {
    if (this.config.loggingEnabled) {
      this.logs.push({ message: message, level: LoggingLevelEnum.Error });
      console.errorColor(message);
    }
  }
}
