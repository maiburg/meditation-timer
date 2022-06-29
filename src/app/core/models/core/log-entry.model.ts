import { LoggingLevelEnum } from '@core/models/enums';

export interface LogEntry {
  message: string;
  level: LoggingLevelEnum;
}
