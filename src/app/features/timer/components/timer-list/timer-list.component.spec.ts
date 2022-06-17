import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { faker } from '@faker-js/faker/locale/de';

import { TimerListComponent } from '@app/features/timer/components';
import { TimerFacade } from '@app/features/timer/services/timer.facade';
import { Timer } from '@core/models/domain';

describe('TimerListComponent', () => {
  let component: TimerListComponent;
  let fixture: ComponentFixture<TimerListComponent>;
  let facade: TimerFacade;

  const timer1: Timer = { id: 1, description: faker.lorem.words(10) };
  const timer2: Timer = { id: 2, description: faker.lorem.words(10) };
  const timers: Timer[] = [timer1, timer2];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TimerListComponent],
      providers: [
        TimerFacade,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { timers }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    facade = TestBed.inject(TimerFacade);
    fixture = TestBed.createComponent(TimerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('retrieve timers from ActivatedRoute', () => {
      component.ngOnInit();

      expect(component.timers).toEqual(timers);
    });
  });

  describe('onTap() should', () => {
    it('call ...', () => {
      const timer: Timer = { id: 7, description: 'foo' };

      // TODO: write test when code is finished
      // component.onTap([timer]);

      expect(null).toBeNull();
    });
  });

  describe('addTimer() should', () => {
    it('call timerFacade.add()', () => {
      const spy = spyOn(facade, 'add');

      component.addTimer();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('deleteTimer() should', () => {
    it('call timerFacade.delete()', () => {
      const spy = spyOn(facade, 'delete');

      component.deleteTimer(1);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('deleteAllTimers() should', () => {
    it('call timerFacade.deleteAll()', () => {
      const spy = spyOn(facade, 'deleteAll');

      component.deleteAllTimers();

      expect(spy).toHaveBeenCalled();
    });
  });
});
