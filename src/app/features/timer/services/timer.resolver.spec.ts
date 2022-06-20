import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { faker } from '@faker-js/faker/locale/de';

import { TimerResolver } from '@app/features/timer/services';
import { SqliteService } from '@core/services';
import { Tables } from '@core/models';
import { TimerPresetting } from '@core/models/domain';

describe('TimerResolver', () => {
  let service: TimerResolver, sqlite: SqliteService;

  const timer: TimerPresetting = {
    id: faker.datatype.number({ min: 1, max: 999999 }),
    description: faker.lorem.words(10)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TimerResolver, SqliteService]
    });
    service = TestBed.inject(TimerResolver);
    sqlite = TestBed.inject(SqliteService);
  });

  describe('resolve() should', () => {
    it('call sqlite.fetch() with table and id if params exist', () => {
      const spy = spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve([timer]));
      const timerId = faker.datatype.number({ min: 1, max: 99999 });
      const mockRoute = { paramMap: convertToParamMap({ timerId }) } as ActivatedRouteSnapshot;

      service.resolve(mockRoute);

      expect(spy).toHaveBeenCalledWith(Tables.timer, timerId);
    });

    it('call sqlite.fetch() with table if NO params exist', () => {
      const spy = spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve([timer]));
      const mockRoute = { paramMap: convertToParamMap({}) } as ActivatedRouteSnapshot;

      service.resolve(mockRoute);

      expect(spy).toHaveBeenCalledWith(Tables.timer, null);
    });
  });
});
