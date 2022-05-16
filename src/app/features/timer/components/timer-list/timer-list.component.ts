import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TimerFacade } from '@app/features/timer/timer.facade';
import { Timer } from '@app/core/models';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
  moduleId: module.id
})
export class TimerListComponent implements OnInit {
  output = '';
  timers$: Observable<any[]>;

  constructor(public timerFacade: TimerFacade) {}

  ngOnInit(): void {
    this.timers$ = this.timerFacade.list$.asObservable();
  }

  onTap(timer: Timer): void {
    console.log('ZUZUZUZU', timer);
    this.deleteTimer(timer.id);
    // this.deleteAllTimers();
    this.output = timer.id + ' ' + timer.description;
  }

  addTimer(): void {
    this.timerFacade.add();
  }

  deleteTimer(id: number): void {
    id && this.timerFacade.delete(id);
  }

  deleteAllTimers(): void {
    this.timerFacade.deleteAll();
  }
}
