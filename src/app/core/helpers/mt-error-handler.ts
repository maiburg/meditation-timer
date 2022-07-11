import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggerService } from '@core/services';

@Injectable()
export class MtErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const loggerService = this.injector.get(LoggerService);
    const msg = error.message || error.toString();

    loggerService.error(msg);
  }
}
