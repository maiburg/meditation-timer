import { TestBed } from '@angular/core/testing';

import { TimerResolver } from '@app/features/timer/services/timer.resolver';

describe('TimerResolver', () => {
  let service: TimerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
