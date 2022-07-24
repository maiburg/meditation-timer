import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private routerExtensions: RouterExtensions, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.routerExtensions.navigate(['/auth/login'], { clearHistory: true }).then();
      return false;
    }
  }
}
