import { Component, OnInit } from '@angular/core';
import { ItemEventData } from '@nativescript/core';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
  moduleId: module.id
})
export class TimerListComponent implements OnInit {
  numbers = [1, 2, 3, 4, 5, 6];
  labelName = 'Item ';
  output = '';

  constructor() {}

  ngOnInit(): void {}

  onTap(event: ItemEventData): void {
    this.output = this.labelName + this.numbers[event.index];
  }
}
