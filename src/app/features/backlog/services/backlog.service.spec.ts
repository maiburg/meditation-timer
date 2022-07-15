import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ServerErrorHandlerService, StoreService } from '@core/services';
import { BacklogRepository } from '@features/backlog/repositories';
import { BacklogService } from '@features/backlog/services';
import { APP_CONFIG } from '@src/config/app-config.module';
import { PtItem } from '@core/models/domain';

describe('BacklogService', () => {
  let service: BacklogService,
    backlogRepository: BacklogRepository,
    errorHandlerService: ServerErrorHandlerService,
    store: StoreService,
    zone: NgZone;

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
    backlogRepository = TestBed.inject(BacklogRepository);
    errorHandlerService = TestBed.inject(ServerErrorHandlerService);
    store = TestBed.inject(StoreService);
    zone = TestBed.inject(NgZone);
  });

  describe('fetchItems() should', () => {
    it('call backlogRepository.getPtItems()', () => {
      const spy = spyOn(backlogRepository, 'getPtItems');

      service.fetchItems();

      expect(spy).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    });
  });

  describe('runInZone() should', () => {
    it('call zone.run()', () => {
      const spy = spyOn(zone, 'run');

      service['runInZone']([{ description: 'foo' } as PtItem]);

      expect(spy).toHaveBeenCalledWith(jasmine.any(Function));
    });
  });

  describe('setStore() should', () => {
    it('call store.set()', () => {
      const spy = spyOn(store, 'set');
      const backlogItems = [{ description: 'foo' } as PtItem];
      const expected = { backlogItems };

      service['setStore'](backlogItems);

      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});
