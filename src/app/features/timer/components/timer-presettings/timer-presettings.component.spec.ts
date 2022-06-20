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

  describe('onTap() should', () => {
    it('call ...', () => {
      const timer: TimerPresetting = { id: 7, description: 'foo' };

      // TODO: write test when code is finished
      // component.onTap([timer]);

      expect(null).toBeNull();
    });
  });

  describe('addTimer() should', () => {
    it('call timerService.add()', () => {
      const spy = spyOn(service, 'add');

      component.addTimer();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('deleteTimer() should', () => {
    it('call timerService.delete()', () => {
      const spy = spyOn(service, 'delete');

      component.deleteTimer(1);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('deleteAllTimers() should', () => {
    it('call timerService.deleteAll()', () => {
      const spy = spyOn(service, 'deleteAll');

      component.deleteAllTimers();

      expect(spy).toHaveBeenCalled();
    });
  });
});
