import { Injectable } from '@angular/core';

import { Utils } from '@app/utils';
import { PtAuthToken } from '@core/models/domain';
import { StorageService } from '@core/services/storage';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

@Injectable()
export class AuthTokenService {
  get token(): PtAuthToken {
    const authToken = this.storageService.getItem<PtAuthToken>(AUTH_TOKEN_KEY);
    authToken?.dateExpires && (authToken.dateExpires = Utils.formateDate(authToken.dateExpires));
    return authToken;
  }

  set token(authToken: PtAuthToken) {
    this.storageService.setItem<PtAuthToken>(AUTH_TOKEN_KEY, authToken);
  }

  constructor(private storageService: StorageService) {}
}
