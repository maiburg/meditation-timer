import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimerPresetting } from '@core/models/domain';

@Component({
  selector: 'ns-timer-presetting-dialog',
  templateUrl: './timer-presetting-dialog.component.html',
  styleUrls: ['./timer-presetting-dialog.component.css'],
  moduleId: module.id
})
export class TimerPresettingDialogComponent implements OnInit {
  description: string;
  presetting: TimerPresetting;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    [this.presetting] = this.route.snapshot.data['presetting'];
  }

  setDescription(): void {
    this.description = 'Dies und das';
  }
}
