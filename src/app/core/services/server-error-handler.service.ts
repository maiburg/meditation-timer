import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ServerErrorHandlerService {
  constructor() {}

  public handleHttpError(error: any): Observable<any> {
    return throwError(() => error.error || 'Server error');
  }
}
