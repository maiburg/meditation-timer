import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { NavigationOptions, RouterExtensions } from '@nativescript/angular';

@Injectable()
export class NavigationService {
  constructor(private routerExtensions: RouterExtensions) {}

  navigate(commands: any[], extras?: NavigationExtras & NavigationOptions): Promise<boolean> {
    return this.routerExtensions.navigate(commands, extras);
  }

  back() {
    this.routerExtensions.back();
  }

  backToPreviousPage() {
    this.routerExtensions.backToPreviousPage();
  }
}
