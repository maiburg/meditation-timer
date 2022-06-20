import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { faker } from '@faker-js/faker/locale/de';

import { TimerPresettingDialogComponent } from '@app/features/timer/components';
import { SqliteService } from '@core/services';
import { TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';

describe('TimerPresettingDialogComponent', () => {
  let component: TimerPresettingDialogComponent;
  let fixture: ComponentFixture<TimerPresettingDialogComponent>;
  let service: TimerService;

  const presetting: TimerPresetting = {
    id: faker.datatype.number({ min: 1, max: 999999 }),
    description: faker.lorem.words(10)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerPresettingDialogComponent],
      providers: [
        TimerService,
        SqliteService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { presetting: [presetting] }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TimerService);
    fixture = TestBed.createComponent(TimerPresettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('retrieve timerPresetting from ActivatedRoute', () => {
      component.ngOnInit();

      expect(component.presetting).toBe(presetting);
    });
  });
});
