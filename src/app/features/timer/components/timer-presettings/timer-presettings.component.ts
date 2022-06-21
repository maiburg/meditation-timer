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
  presettings: TimerPresetting[];

  constructor(private route: ActivatedRoute, private timerService: TimerService) {}

  ngOnInit(): void {
    this.presettings = this.route.snapshot.data['presettings'];
  }

  reload(): void {
    this.timerService.loadAllTimerPresettings().then((result: TimerPresetting[]) => (this.presettings = result));
  }
}
