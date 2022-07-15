import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BacklogRepository } from '@features/backlog/repositories';
import { APP_CONFIG } from '@src/config/app-config.module';

describe('BacklogRepository', () => {
  let service: BacklogRepository, http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BacklogRepository, HttpClient, { provide: APP_CONFIG, useValue: {} }]
    });
    service = TestBed.inject(BacklogRepository);
    http = TestBed.inject(HttpClient);
  });

  describe('backlogUrl() should', () => {
    it('call http.get()', () => {
      const spy = spyOn(http, 'get').and.returnValue(of({}));
      const url = 'foo/bar/baz';
      spyOnProperty<any>(service, 'backlogUrl', 'get').and.returnValue(url);

      service.getPtItems(null, null);

      expect(spy).toHaveBeenCalledWith(url);
    });
  });
});
