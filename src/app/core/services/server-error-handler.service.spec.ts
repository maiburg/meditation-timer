import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ServerErrorHandlerService } from '@core/services';

describe('ServerErrorHandlerService', () => {
  let service: ServerErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerErrorHandlerService]
    });
    service = TestBed.inject(ServerErrorHandlerService);
  });

  xdescribe('handleHttpError() should', () => {
    it('return the error message of HttpErrorResponse if it has one', () => {
      const error = {
        error: 'Something went wrong!',
        status: 501
      } as HttpErrorResponse;

      service.handleHttpError(error).subscribe(msg => {
        expect(msg).toBe(error.error);
      });
    });

    it('return a fallback error message if the error has no error property', () => {
      const expected = 'Server error';
      const error = { status: 501 } as HttpErrorResponse;

      service.handleHttpError(error).subscribe(msg => {
        expect(msg).toBe(expected);
      });
    });
  });
});
