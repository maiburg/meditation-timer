import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker/locale/de';

import { MtErrorHandler } from '@core/helpers';
import { LoggerService } from '@core/services';
import { APP_CONFIG } from '@src/config/app-config.module';

describe('MtErrorHandler', () => {
  let handler: MtErrorHandler, loggerService: LoggerService, injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MtErrorHandler, LoggerService, { provide: APP_CONFIG, useValue: {} }]
    });
    handler = TestBed.inject(MtErrorHandler);
    loggerService = TestBed.inject(LoggerService);
    injector = TestBed.inject(Injector);
  });

  describe('handleError() should', () => {
    it(`call loggerService.error() with message if error has an error property`, () => {
      const spy = spyOn(loggerService, 'error');
      const message = faker.lorem.words(10);

      handler.handleError({ message });

      expect(spy).toHaveBeenCalledWith(message);
    });

    it(`call loggerService.error() with message if error has an error property`, () => {
      const spy = spyOn(loggerService, 'error');
      const error = { foo: faker.lorem.words(10) };

      handler.handleError(error);

      expect(spy).toHaveBeenCalledWith(error.toString());
    });
  });
});
