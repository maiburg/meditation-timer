import { Component, OnInit } from '@angular/core';

import { Timer } from '@app/core/models';

@Component({
  selector: 'ns-timer-add-edit',
  templateUrl: './timer-add-edit.component.html',
  styleUrls: ['./timer-add-edit.component.css'],
  moduleId: module.id
})
export class TimerAddEditComponent implements OnInit {
  challengeDescription = '';
  timer: Timer;

  ngOnInit(): void {}
}
