import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerDialogComponent } from '@app/features/timer/components/timer-dialog/timer-dialog.component';
import { TimerFacade } from '@app/features/timer/services/timer.facade';

describe('TimerDialogComponent', () => {
  let component: TimerDialogComponent;
  let fixture: ComponentFixture<TimerDialogComponent>;
  let facade: TimerFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerDialogComponent],
      providers: [TimerFacade]
    }).compileComponents();
  });

  beforeEach(() => {
    facade = TestBed.inject(TimerFacade);
    fixture = TestBed.createComponent(TimerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('call ...', () => {
      const expected = null;

      component.ngOnInit();
      // TODO: write test when code is finished

      expect(expected).toBeNull();
    });
  });
});
