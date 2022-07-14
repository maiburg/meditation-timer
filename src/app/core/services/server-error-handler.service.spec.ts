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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
