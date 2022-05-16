import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerListComponent } from './timer-list.component';
import { TimerFacade } from '@app/features/timer/timer.facade';
import { Timer } from '@app/core/models';

describe('TimerListComponent', () => {
  let component: TimerListComponent;
  let fixture: ComponentFixture<TimerListComponent>;
  let facade: TimerFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerListComponent],
      providers: [TimerFacade]
    }).compileComponents();
  });

  beforeEach(() => {
    facade = TestBed.inject(TimerFacade);
    fixture = TestBed.createComponent(TimerListComponent);
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
