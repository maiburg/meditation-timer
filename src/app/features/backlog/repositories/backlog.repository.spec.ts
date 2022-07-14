import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BacklogRepository } from '@features/backlog/repositories';
import { APP_CONFIG } from '@src/config/app-config.module';

describe('BacklogRepository', () => {
  let service: BacklogRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BacklogRepository, { provide: APP_CONFIG, useValue: {} }, HttpClient]
    });
    service = TestBed.inject(BacklogRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
