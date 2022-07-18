import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig, State } from '@core/models/core';
import { PtAuthToken, PtLoginModel, PtUser } from '@core/models/domain';
import { AuthTokenService } from '@core/services/auth-token.service';
import { ServerErrorHandlerService } from '@core/services/server-error-handler.service';
import { StoreService } from '@core/services/store.service';
import { StorageService } from '@core/services/storage';
import { APP_CONFIG } from '@src/config/app-config.module';
import { catchError, Observable, tap } from 'rxjs';

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
    const currentUser = this.storageService.getItem<PtUser>(CURRENT_USER_KEY);
    if (!this.store.state.currentUser && currentUser) {
      this.store.set({ currentUser });
    }
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
    const hasToken = !!this.authTokenService.token;
    const hasCurrentUser = !!this.currentUser;
    return hasToken && hasCurrentUser;
  }

  login(loginModel: PtLoginModel): Observable<PtUser> {
    this.loginInternal(loginModel).subscribe();
    return this.store.select<PtUser>((state: State) => state.currentUser);
  }

  logout() {
    this.authTokenService.token = { access_token: '', dateExpires: new Date() };
    this.storageService.setItem(CURRENT_USER_KEY, '');
  }

  private loginInternal(loginModel: PtLoginModel) {
    return this.http
      .post(this.loginUrl, {
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
}
