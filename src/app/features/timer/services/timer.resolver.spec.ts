import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { faker } from '@faker-js/faker/locale/de';
import { of } from 'rxjs';

import { TimerResolver, TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';
import { SqliteService, StoreService } from '@core/services';

describe('TimerResolver', () => {
  let service: TimerResolver, timerService: TimerService;

  const timer: TimerPresetting = {
    id: faker.datatype.number({ min: 1, max: 999999 }),
    description: faker.lorem.words(10)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TimerResolver, TimerService, SqliteService, StoreService]
    });

    service = TestBed.inject(TimerResolver);
    timerService = TestBed.inject(TimerService);
  });

  describe('resolve() should', () => {
    it('call timerService.loadTimerPresettingById() with id if params exist', () => {
      const spy = spyOn(timerService, 'loadTimerPresettingById').and.returnValue(of([timer]));
      const timerId = faker.datatype.number({ min: 1, max: 99999 });
      const mockRoute = { paramMap: convertToParamMap({ timerId }) } as ActivatedRouteSnapshot;

      service.resolve(mockRoute);

      expect(spy).toHaveBeenCalledWith(timerId);
    });

    it('call timerService.loadAllTimerPresettings() if NO params exist', () => {
      const spy = spyOn(timerService, 'loadAllTimerPresettings').and.returnValue(of([timer]));
      const mockRoute = { paramMap: convertToParamMap({}) } as ActivatedRouteSnapshot;

      service.resolve(mockRoute);

      expect(spy).toHaveBeenCalledWith();
    });

    it('return an observable of TimerPresetting[]', async () => {
      const expected = [timer];
      spyOn(timerService, 'loadTimerPresettingById').and.returnValue(of(expected));
      const timerId = faker.datatype.number({ min: 1, max: 99999 });
      const mockRoute = { paramMap: convertToParamMap({ timerId }) } as ActivatedRouteSnapshot;

      await service.resolve(mockRoute).subscribe(result => {
        expect(result).toEqual(expected);
      });
    });
  });
});
