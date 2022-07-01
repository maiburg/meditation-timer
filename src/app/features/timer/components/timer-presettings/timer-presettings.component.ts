import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';
import { Device, Page } from '@nativescript/core';

@Component({
  selector: 'app-timer-presettings',
  templateUrl: './timer-presettings.component.html',
  styleUrls: ['./timer-presettings.component.scss']
})
export class TimerPresettingsComponent implements OnInit {
  output = '';
  presettings: TimerPresetting[];

  constructor(private route: ActivatedRoute, private timerService: TimerService, private page: Page) {
    page.backgroundColor = '#ff0000';
    page.backgroundSpanUnderStatusBar = true;
    // page.actionBarHidden = true;
    this.output = Device.osVersion;
  }

  ngOnInit(): void {
    this.presettings = this.route.snapshot.data['presettings'];
  }

  reload(): void {
    this.timerService.loadAllTimerPresettings().then((result: TimerPresetting[]) => (this.presettings = result));
  }
}
