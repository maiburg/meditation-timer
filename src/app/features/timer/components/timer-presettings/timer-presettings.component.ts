import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';

@Component({
  selector: 'app-timer-presettings',
  templateUrl: './timer-presettings.component.html',
  styleUrls: ['./timer-presettings.component.scss'],
  moduleId: module.id
})
export class TimerPresettingsComponent implements OnInit {
  output = '';
  presettings: TimerPresetting[];

  constructor(private route: ActivatedRoute, private timerService: TimerService) {}

  ngOnInit(): void {
    this.presettings = this.route.snapshot.data['presettings'];
  }

  onTap(timer: TimerPresetting): void {
    // console.log('ZUZUZUZU', timer);
    // this.deleteTimer(timer.id);
    // // this.deleteAllTimers();
    // this.output = timer.id + ' ' + timer.description;
  }

  addTimer(): void {
    // this.timers$ = this.timerService.list$.asObservable();
    // this.route.data.pipe(map(data => data['timer'])).subscribe(data => console.log('asdfasdf****', data));
    this.timerService.add();
    // this.router.navigateByUrl('/timer').then();
    // console.log('REIRJEIRJEIRJERJ****', this.route.snapshot.data['timer']);
  }

  deleteTimer(id: number): void {
    id && this.timerService.delete(id);
  }

  deleteAllTimers(): void {
    this.timerService.deleteAll();
  }
}
