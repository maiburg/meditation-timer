import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
  moduleId: module.id
})
export class TimerListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get returnTwo(): number {
    return 2;
  }
}
