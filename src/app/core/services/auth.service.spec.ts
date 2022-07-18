import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker/locale/de';
import { of } from 'rxjs';

import { Utils } from '@app/utils';
import { AuthService, AuthTokenService, ServerErrorHandlerService, StoreService } from '@core/services';
import { StorageService } from '@core/services/storage';
import { AppConfigModule } from '@src/config/app-config.module';
import { PtAuthToken, PtLoginModel, PtUser } from '@core/models/domain';
import { GenderEnum } from '@core/models/domain/enums';

describe('AuthService', () => {
  let service: AuthService,
    storageService: StorageService,
    storeService: StoreService,
    authTokenService: AuthTokenService,
    http: HttpClient,
    utils: Utils;

  let currentUser: PtUser, authToken: PtAuthToken, loginModel: PtLoginModel, dateExpires: Date;

  beforeEach(() => {
    dateExpires = faker.date.soon();
    currentUser = {
      id: faker.datatype.number({ min: 1, max: 999999 }),
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      avatar: faker.word.noun(20),
      gender: GenderEnum.Unspecified,
      dateCreated: faker.date.between('2000-01-01', '2010-01-01'),
      dateModified: faker.date.between('2010-01-02', Date.now())
    };
    authToken = {
      access_token: faker.random.alphaNumeric(20),
      dateExpires
    };
    loginModel = { username: faker.internet.email(), password: faker.random.alphaNumeric(10) };

    TestBed.configureTestingModule({
      imports: [AppConfigModule, HttpClientTestingModule],
      providers: [AuthService, HttpClient, StoreService, AuthTokenService, ServerErrorHandlerService, Utils]
    });
    service = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    storeService = TestBed.inject(StoreService);
    authTokenService = TestBed.inject(AuthTokenService);
    http = TestBed.inject(HttpClient);
    utils = TestBed.inject(Utils);
  });

  describe('get currentUser() should', () => {
    it(`call store.set() if there's a currentUser and state has NO currentUser`, () => {
      const spy = spyOn(storeService, 'set');
      spyOn(storageService, 'getItem').and.returnValue(currentUser);
      spyOnProperty(storeService, 'state', 'get').and.returnValue({ currentUser: undefined });

      service.currentUser;

      expect(spy).toHaveBeenCalled();
      expect(service.currentUser).toEqual(currentUser);
    });

    it(`NOT call store.set() if there's a currentUser and state has a currentUser`, () => {
      const spy = spyOn(storeService, 'set');
      spyOn(storageService, 'getItem').and.returnValue(currentUser);
      spyOnProperty(storeService, 'state', 'get').and.returnValue({ currentUser });

      service.currentUser;

      expect(spy).not.toHaveBeenCalled();
      expect(service.currentUser).toEqual(currentUser);
    });

    it(`NOT call store.set() if there's NO currentUser and state has NO a currentUser`, () => {
      const spy = spyOn(storeService, 'set');
      spyOn(storageService, 'getItem').and.returnValue(undefined);
      spyOnProperty(storeService, 'state', 'get').and.returnValue({ currentUser: undefined });

      service.currentUser;

      expect(spy).not.toHaveBeenCalled();
      expect(service.currentUser).toBeUndefined();
    });

    it(`return a currentUser with date fields being an instance of Date`, () => {
      const dateString = '2002-06-22T21:13:43.149Z';
      currentUser = {
        ...currentUser,
        dateCreated: dateString,
        dateModified: dateString,
        dateDeleted: dateString
      };

      spyOn(storageService, 'getItem').and.returnValue(currentUser);

      expect(service.currentUser.dateCreated).toBeInstanceOf(Date);
      expect(service.currentUser.dateCreated).toEqual(new Date(dateString));
      expect(service.currentUser.dateModified).toBeInstanceOf(Date);
      expect(service.currentUser.dateCreated).toEqual(new Date(dateString));
      expect(service.currentUser.dateDeleted).toBeInstanceOf(Date);
      expect(service.currentUser.dateCreated).toEqual(new Date(dateString));
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

  describe('isLoggedIn() should', () => {
    it(`return TRUE if AuthTokenService returns a token and there's a currentUser`, () => {
      spyOnProperty(authTokenService, 'token', 'get').and.returnValue(authToken);
      spyOnProperty(service, 'currentUser', 'get').and.returnValue(currentUser);

      expect(service.isLoggedIn()).toBeTrue();
    });

    it(`return FALSE if AuthTokenService returns NO token and there's a currentUser`, () => {
      spyOnProperty(authTokenService, 'token', 'get').and.returnValue(undefined);
      spyOnProperty(service, 'currentUser', 'get').and.returnValue(currentUser);

      expect(service.isLoggedIn()).toBeFalse();
    });

    it(`return FALSE if AuthTokenService returns a token and there's NO currentUser`, () => {
      spyOnProperty(authTokenService, 'token', 'get').and.returnValue(authToken);
      spyOnProperty(service, 'currentUser', 'get').and.returnValue(undefined);

      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('login() should', () => {
    it(`return an observable containing state.currentUser`, () => {
      const spy = spyOn(storeService, 'select').and.returnValue(of({ currentUser }));

      service.login(loginModel).subscribe(val => {
        expect(val['currentUser']).toEqual(currentUser);
        expect(spy).toHaveBeenCalled();
      });
    });

    it(`call loginInternal()`, () => {
      const spy = spyOn<any>(service, 'loginInternal').and.returnValue(of({ authToken, user: currentUser }));

      service.login(loginModel);

      expect(spy).toHaveBeenCalledWith(loginModel);
    });
  });

  describe('logout() should', () => {
    it(`reset authTokenService.token`, () => {
      const token = { access_token: faker.random.alphaNumeric(20), dateExpires };
      authTokenService.token = token;

      service.logout();

      expect(authTokenService.token.access_token).toEqual('');
      expect(authTokenService.token.dateExpires).not.toEqual(dateExpires);
    });

    it(`reset currentUser in storage`, () => {
      const key = 'CURRENT_USER_KEY';
      storageService.setItem('CURRENT_USER_KEY', currentUser);

      service.logout();

      expect(storageService.getItem(key)).toBe('');
    });
  });

  describe('loginInternal() should', () => {
    it(`call http.post()`, () => {
      const spy = spyOn(http, 'post').and.returnValue(of({ authToken, user: currentUser }));

      service.login(loginModel);

      expect(spy).toHaveBeenCalledWith(service['loginUrl'], { loginModel, grant_type: 'password' });
    });

    it(`set authTokenService.token`, () => {
      storageService.clear();
      spyOn(http, 'post').and.returnValue(of({ authToken, user: currentUser }));

      service.login(loginModel);

      expect(authTokenService.token).toEqual(authToken);
    });

    it(`set currentUser`, () => {
      spyOn(http, 'post').and.returnValue(of({ authToken, user: currentUser }));

      service.login(loginModel);

      expect(service.currentUser).toEqual(currentUser);
    });
  });
});
