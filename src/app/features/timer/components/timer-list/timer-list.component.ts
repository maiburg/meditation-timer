import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TimerFacade } from '@app/features/timer/services';
import { Timer } from '@app/core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
  moduleId: module.id
})
export class TimerListComponent implements OnInit {
  output = '';
  timers$: Observable<Timer[]>;
  // timers: Timer[];

  constructor(private router: Router, private route: ActivatedRoute, private timerFacade: TimerFacade) {}

  ngOnInit(): void {
    this.timers$ = this.route.data.pipe(map(data => data['timer']));
    // this.timers = this.route.snapshot.data['timer'];
    // this.timers$ = this.timerFacade.fetch();
  }

  onTap(timer: Timer): void {
    // console.log('ZUZUZUZU', timer);
    // this.deleteTimer(timer.id);
    // // this.deleteAllTimers();
    // this.output = timer.id + ' ' + timer.description;
  }

  addTimer(): void {
    // this.timers$ = this.timerFacade.list$.asObservable();
    // this.route.data.pipe(map(data => data['timer'])).subscribe(data => console.log('asdfasdf****', data));
    this.timerFacade.add();
    // this.router.navigateByUrl('/timer').then();
    // console.log('REIRJEIRJEIRJERJ****', this.route.snapshot.data['timer']);
  }

  deleteTimer(id: number): void {
    id && this.timerFacade.delete(id);
  }

  deleteAllTimers(): void {
    this.timerFacade.deleteAll();
  }
}
