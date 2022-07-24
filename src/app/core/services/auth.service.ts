import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

import { Utils } from '@app/utils';
import { AppConfig, State } from '@core/models/core';
import { PtAuthToken, PtLoginModel, PtRegisterModel, PtUser } from '@core/models/domain';
import { AuthTokenService } from '@core/services/auth-token.service';
import { ServerErrorHandlerService } from '@core/services/server-error-handler.service';
import { StorageService } from '@core/services/storage';
import { StoreService } from '@core/services/store.service';
import { APP_CONFIG } from '@src/config/app-config.module';

const CURRENT_USER_KEY = 'CURRENT_USER_KEY';

@Injectable()
export class AuthService {
  private get loginUrl() {
    return `${this.config.apiEndpoint}/auth`;
  }

  private get registerUrl() {
    return `${this.config.apiEndpoint}/register`;
  }

  get currentUser(): PtUser {
    let currentUser = this.storageService.getItem<PtUser>(CURRENT_USER_KEY);

    currentUser?.dateCreated && (currentUser.dateCreated = Utils.formateDate(currentUser.dateCreated));
    currentUser?.dateModified && (currentUser.dateModified = Utils.formateDate(currentUser.dateModified));
    currentUser?.dateDeleted && (currentUser.dateDeleted = Utils.formateDate(currentUser.dateDeleted));

    !this.store.state.currentUser && currentUser && this.store.set({ currentUser });

    return currentUser;
  }

  set currentUser(currentUser: PtUser) {
    this.storageService.setItem<PtUser>(CURRENT_USER_KEY, currentUser);
    this.store.set({ currentUser });
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private store: StoreService,
    private authTokenService: AuthTokenService,
    private storageService: StorageService,
    private errorHandlerService: ServerErrorHandlerService
  ) {}

  isLoggedIn(): boolean {
    return !!this.authTokenService.token && !!this.currentUser;
  }

  login(loginModel: PtLoginModel): Observable<PtUser> {
    this.loginInternal(loginModel).subscribe();
    return this.store.select<PtUser>((state: State) => state.currentUser);
  }

  register(registerModel: PtRegisterModel): Observable<PtUser> {
    this.registerInternal(registerModel).subscribe();
    return this.store.select<PtUser>((state: State) => state.currentUser);
  }

  logout() {
    this.authTokenService.token = { access_token: '', dateExpires: new Date() };
    this.storageService.setItem(CURRENT_USER_KEY, '');
  }

  private loginInternal(
    loginModel: PtLoginModel
  ): Observable<string | PtUser | { authToken: PtAuthToken; user: PtUser }> {
    return this.http
      .post<{ authToken: PtAuthToken; user: PtUser }>(this.loginUrl, {
        loginModel: loginModel,
        grant_type: 'password'
      })
      .pipe(
        tap((data: { authToken: PtAuthToken; user: PtUser }) => {
          this.authTokenService.token = data.authToken;
          this.currentUser = data.user;
        }),
        catchError(this.errorHandlerService.handleHttpError)
      );
  }

  private registerInternal(registerModel: PtRegisterModel) {
    return this.http.post(this.registerUrl, { registerModel: registerModel }).pipe(
      tap((data: { authToken: PtAuthToken; user: PtUser }) => {
        this.authTokenService.token = data.authToken;
        this.currentUser = data.user;
      }),
      catchError(this.errorHandlerService.handleHttpError)
    );
  }
}
