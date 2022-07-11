import { Injectable } from '@angular/core';
import { clear, getString, remove, setString } from '@nativescript/core/application-settings';

import { StorageService } from './storage.service';

@Injectable()
export class StorageNsService extends StorageService {
  constructor() {
    super();
  }

  setItem<T>(key: string, value: T): void {
    const valueStr = JSON.stringify(value);
    setString(key, valueStr);
  }

  getItem<T>(key: string): T {
    const valueStr = getString(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    } else {
      return undefined;
    }
  }

  removeItem(key: string): void {
    remove(key);
  }

  key(keyIndex: number): string {
    throw new Error('Method not implemented.');
  }

  clear(): void {
    clear();
  }
}
