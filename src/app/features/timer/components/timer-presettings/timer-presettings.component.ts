import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '@nativescript/core';

import { TimerPresetting } from '@core/models/domain';

@Component({
  selector: 'app-timer-presettings',
  templateUrl: './timer-presettings.component.html',
  styleUrls: ['./timer-presettings.component.sass']
})
export class TimerPresettingsComponent implements OnInit {
  presettings: TimerPresetting[];

  constructor(private route: ActivatedRoute, protected page: Page) {
    page.backgroundSpanUnderStatusBar = true;
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.presettings = this.route.snapshot.data['presettings'];
  }
}
