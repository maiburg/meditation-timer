import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ServerErrorHandlerService {
  constructor() {}

  public handleHttpError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => error?.error || 'Server error');
  }
}
