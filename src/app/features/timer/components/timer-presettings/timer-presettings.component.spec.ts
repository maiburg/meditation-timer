import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { faker } from '@faker-js/faker/locale/de';

import { TimerPresettingsComponent } from '@app/features/timer/components';
import { TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';
import { SqliteService } from '@core/services';

describe('TimerPresettingsComponent', () => {
  let component: TimerPresettingsComponent;
  let fixture: ComponentFixture<TimerPresettingsComponent>;
  let service: TimerService;

  const timer1: TimerPresetting = { id: 1, description: faker.lorem.words(10) };
  const timer2: TimerPresetting = { id: 2, description: faker.lorem.words(10) };
  const presettings: TimerPresetting[] = [timer1, timer2];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TimerPresettingsComponent],
      providers: [
        TimerService,
        SqliteService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { presettings }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TimerService);
    fixture = TestBed.createComponent(TimerPresettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('retrieve timers from ActivatedRoute', () => {
      component.ngOnInit();

      expect(component.presettings).toEqual(presettings);
    });
  });

  describe('reload() should', () => {
    it('set presettings', () => {
      const expected = presettings;
      const spy = spyOn(service, 'loadAllTimerPresettings').and.returnValue(Promise.resolve(presettings));

      component.reload();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.presettings).toEqual(expected);
    });
  });
});
