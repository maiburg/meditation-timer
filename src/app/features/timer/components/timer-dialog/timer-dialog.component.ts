import { Component, OnInit } from '@angular/core';

import { Timer } from '@app/core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-timer-dialog',
  templateUrl: './timer-dialog.component.html',
  styleUrls: ['./timer-dialog.component.css'],
  moduleId: module.id
})
export class TimerDialogComponent implements OnInit {
  description: string;
  timer: Timer;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    [this.timer] = this.route.snapshot.data['timer'];
  }

  setDescription(): void {
    this.description = 'Dies und das';
  }
}
