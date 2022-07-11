import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';
import { Page } from '@nativescript/core';

@Component({
  selector: 'app-timer-presettings',
  templateUrl: './timer-presettings.component.html',
  styleUrls: ['./timer-presettings.component.scss']
})
export class TimerPresettingsComponent implements OnInit {
  presettings: TimerPresetting[];

  constructor(private route: ActivatedRoute, private timerService: TimerService, page: Page) {
    page.backgroundSpanUnderStatusBar = true;
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.presettings = this.route.snapshot.data['presettings'];
  }

  reload(): void {
    this.timerService.loadAllTimerPresettings().then((result: TimerPresetting[]) => (this.presettings = result));
  }
}
