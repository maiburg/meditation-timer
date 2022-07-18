import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker/locale/de';

import { Utils } from '@app/utils';
import { PtAuthToken } from '@core/models/domain';
import { AuthService, AuthTokenService, ServerErrorHandlerService, StoreService } from '@core/services';
import { StorageService } from '@core/services/storage';
import { AppConfigModule } from '@src/config/app-config.module';

describe('AuthTokenService', () => {
  let service: AuthTokenService, storageService: StorageService, utils: Utils;

  let authToken: PtAuthToken, dateExpires: Date;

  beforeEach(() => {
    dateExpires = faker.date.soon();
    authToken = {
      access_token: faker.random.alphaNumeric(20),
      dateExpires
    };

    TestBed.configureTestingModule({
      imports: [AppConfigModule, HttpClientTestingModule],
      providers: [AuthService, HttpClient, StoreService, AuthTokenService, ServerErrorHandlerService, Utils]
    });
    service = TestBed.inject(AuthTokenService);
    storageService = TestBed.inject(StorageService);
    utils = TestBed.inject(Utils);
  });

  describe('get token() should', () => {
    it(`return a token`, () => {
      spyOn(storageService, 'getItem').and.returnValue(authToken);

      expect(service.token).toBe(authToken);
    });
  });

  describe('set token() should', () => {
    it(`store a token in the local storage`, () => {
      const spy = spyOn(storageService, 'setItem');

      service.token = authToken;

      expect(spy).toHaveBeenCalledWith('AUTH_TOKEN_KEY', authToken);
    });
  });
});
