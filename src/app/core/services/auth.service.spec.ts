import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker/locale/de';

import { AuthService, AuthTokenService, ServerErrorHandlerService, StoreService } from '@core/services';
import { StorageService } from '@core/services/storage';
import { AppConfigModule } from '@src/config/app-config.module';
import { PtUser } from '@core/models/domain';
import { GenderEnum } from '@core/models/domain/enums';

fdescribe('AuthService', () => {
  let service: AuthService, storageService: StorageService, storeService: StoreService, currentUser: PtUser;

  beforeEach(() => {
    currentUser = {
      id: faker.datatype.number({ min: 1, max: 999999 }),
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      avatar: faker.word.noun(2),
      gender: GenderEnum.Unspecified,
      dateCreated: faker.date.between('2000-01-01', '2010-01-01'),
      dateModified: faker.date.between('2010-01-02', Date.now())
    };

    TestBed.configureTestingModule({
      imports: [AppConfigModule, HttpClientTestingModule],
      providers: [AuthService, HttpClient, StoreService, AuthTokenService, ServerErrorHandlerService]
    });
    service = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    storeService = TestBed.inject(StoreService);
  });

  describe('get currentUser() should', () => {
    it(`call store.set() if there's a currentUser and state has NO currentUser`, () => {
      const spy = spyOn(storeService, 'set');
      spyOn(storageService, 'getItem').and.returnValue(currentUser);
      spyOnProperty(storeService, 'state', 'get').and.returnValue({ currentUser: undefined });

      service.currentUser;

      expect(spy).toHaveBeenCalled();
      expect(service.currentUser).toBe(currentUser);
    });

    it(`NOT call store.set() if there's a currentUser and state has a currentUser`, () => {
      const spy = spyOn(storeService, 'set');
      spyOn(storageService, 'getItem').and.returnValue(currentUser);
      spyOnProperty(storeService, 'state', 'get').and.returnValue({ currentUser });

      service.currentUser;

      expect(spy).not.toHaveBeenCalled();
      expect(service.currentUser).toBe(currentUser);
    });

    it(`NOT call store.set() if there's NO currentUser and state has NO a currentUser`, () => {
      const spy = spyOn(storeService, 'set');
      spyOn(storageService, 'getItem').and.returnValue(undefined);
      spyOnProperty(storeService, 'state', 'get').and.returnValue({ currentUser: undefined });

      service.currentUser;

      expect(spy).not.toHaveBeenCalled();
      expect(service.currentUser).toBe(undefined);
    });
  });

  describe('set currentUser() should', () => {
    it(`call storageService.setItem()`, () => {
      const spy = spyOn(storageService, 'setItem');

      service.currentUser = currentUser;

      expect(spy).toHaveBeenCalledWith('CURRENT_USER_KEY', currentUser);
    });

    it(`call storeService.set()`, () => {
      const spy = spyOn(storeService, 'set');

      service.currentUser = currentUser;

      expect(spy).toHaveBeenCalledWith({ currentUser });
    });
  });
});
