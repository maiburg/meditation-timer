import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerAddEditComponent } from '@app/features/timer/components/timer-add-edit/timer-add-edit.component';
import { TimerFacade } from '@app/features/timer/timer.facade';

describe('TimerAddEditComponent', () => {
  let component: TimerAddEditComponent;
  let fixture: ComponentFixture<TimerAddEditComponent>;
  let facade: TimerFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerAddEditComponent],
      providers: [TimerFacade]
    }).compileComponents();
  });

  beforeEach(() => {
    facade = TestBed.inject(TimerFacade);
    fixture = TestBed.createComponent(TimerAddEditComponent);
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
