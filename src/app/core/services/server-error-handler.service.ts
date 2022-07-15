import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ServerErrorHandlerService {
  constructor() {}

  handleHttpError(error: HttpErrorResponse): Observable<string> {
    return throwError(() => error?.error || 'Server error');
  }
}
