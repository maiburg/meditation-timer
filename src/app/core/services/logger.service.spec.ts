import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker/locale/de';

import { LoggerService } from '@core/services';
import { APP_CONFIG, AppConfigModule } from '@src/config/app-config.module';
import { LogEntry } from '@core/models/core';
import { LoggingLevelEnum } from '@core/models/enums';

describe('StoreService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppConfigModule],
      providers: [
        LoggerService,
        {
          provide: APP_CONFIG,
          useValue: {
            loggingEnabled: true,
            loggingLevel: LoggingLevelEnum.Debug
          }
        }
      ]
    });
    service = TestBed.inject(LoggerService);
  });

  describe('log() should', () => {
    it('call console.logColor()', () => {
      const message = faker.lorem.words(10);
      const spy = spyOn(console, 'logColor');

      service.log(message);

      expect(spy).toHaveBeenCalledOnceWith(message);
    });

    it('push to logs array', () => {
      const message = faker.lorem.words(10);
      const expected: LogEntry = { message, level: LoggingLevelEnum.Log };

      service.log(message);

      expect(service['logs']).toEqual([expected]);
    });
  });

  describe('warn() should', () => {
    it('call console.warnColor()', () => {
      const message = faker.lorem.words(10);
      const spy = spyOn(console, 'warnColor');

      service.warn(message);

      expect(spy).toHaveBeenCalledOnceWith(message);
    });

    it('push to logs array', () => {
      const message = faker.lorem.words(10);
      const expected: LogEntry = { message, level: LoggingLevelEnum.Warn };

      service.warn(message);

      expect(service['logs']).toEqual([expected]);
    });
  });

  describe('error() should', () => {
    it('call console.warnColor()', () => {
      const message = faker.lorem.words(10);
      const spy = spyOn(console, 'errorColor');

      service.error(message);

      expect(spy).toHaveBeenCalledOnceWith(message);
    });

    it('push to logs array', () => {
      const message = faker.lorem.words(10);
      const expected: LogEntry = { message, level: LoggingLevelEnum.Error };

      service.error(message);

      expect(service['logs']).toEqual([expected]);
    });
  });
});
