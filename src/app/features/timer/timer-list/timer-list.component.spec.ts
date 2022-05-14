import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerListComponent } from './timer-list.component';
import { ItemEventData } from '@nativescript/core';

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

  describe('onTap() should', () => {
    it('set output to label name', () => {
      const event = { index: 1 } as ItemEventData;

      component.onTap(event);

      expect(component.output).toBe(component.labelName + component.numbers[event.index]);
      expect(component.output).toBe('Item 2');
    });
  });
});
