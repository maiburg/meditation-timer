import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimerListComponent } from './timer-list.component';

describe('TimerListComponent', () => {
  let component: TimerListComponent;
  let fixture: ComponentFixture<TimerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('returnTwo() should', () => {
    it('return 2', () => {
      const num = 3;

      expect(component.returnTwo).toBe(num);
    });
  });
});
