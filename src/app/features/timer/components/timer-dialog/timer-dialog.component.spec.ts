import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { faker } from '@faker-js/faker/locale/de';

import { TimerDialogComponent } from '@app/features/timer/components/timer-dialog/timer-dialog.component';
import { TimerFacade } from '@app/features/timer/services/timer.facade';
import { Timer } from '@core/models/domain';

describe('TimerDialogComponent', () => {
  let component: TimerDialogComponent;
  let fixture: ComponentFixture<TimerDialogComponent>;
  let facade: TimerFacade;

  const timer: Timer = {
    id: faker.datatype.number({ min: 1, max: 999999 }),
    description: faker.lorem.words(10)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [TimerDialogComponent],
      providers: [
        TimerFacade,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { timer: [timer] }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    facade = TestBed.inject(TimerFacade);
    fixture = TestBed.createComponent(TimerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('retrieve timer from ActivatedRoute', () => {
      component.ngOnInit();

      expect(component.timer).toBe(timer);
    });
  });
});
