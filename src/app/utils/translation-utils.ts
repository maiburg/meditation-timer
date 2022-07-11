import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export const translationHttpLoaderFactory = (http: HttpClient) =>
  new TranslateHttpLoader(<any>http, '/assets/i18n/', '.json');

export class TranslateLoaderStub implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}
