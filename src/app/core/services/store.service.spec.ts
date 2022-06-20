import { TestBed } from '@angular/core/testing';

import { StoreService } from '@core/services';
import { TimerPresetting } from '@core/models/domain';
import { State } from '@core/models/core';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should set a new state and select it again`, done => {
    const timer: TimerPresetting = { id: 1, description: 'Some description' };
    service.set({ timerPresetting: timer });

    service
      .select((state: State) => state.timerPresetting)
      .subscribe(val => {
        expect(val).toEqual(timer);
        done();
      });
  });

  describe(`state should`, () => {
    it(`be equal initialState if no state was set`, () => {
      expect(service['state']).toEqual(service.initialState);
    });
  });
});
