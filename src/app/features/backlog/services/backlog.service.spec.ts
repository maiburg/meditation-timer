import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ServerErrorHandlerService, StoreService } from '@core/services';
import { BacklogRepository } from '@features/backlog/repositories';
import { BacklogService } from '@features/backlog/services';
import { APP_CONFIG } from '@src/config/app-config.module';

describe('BacklogService', () => {
  let service: BacklogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BacklogService,
        BacklogRepository,
        HttpClient,
        StoreService,
        ServerErrorHandlerService,
        { provide: APP_CONFIG, useValue: {} }
      ]
    });
    service = TestBed.inject(BacklogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
