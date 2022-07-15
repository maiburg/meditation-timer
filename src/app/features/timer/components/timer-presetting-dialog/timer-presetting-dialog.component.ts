import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page, TextField } from '@nativescript/core';

import { TimerPresetting } from '@core/models/domain';
import { TimerService } from '@app/features/timer/services';

@Component({
  selector: 'ns-timerPresetting-presetting-dialog',
  templateUrl: './timer-presetting-dialog.component.html',
  styleUrls: ['./timer-presetting-dialog.component.css']
})
export class TimerPresettingDialogComponent implements OnInit {
  @ViewChild('desc') textField: ElementRef;
  presetting: TimerPresetting;

  constructor(private route: ActivatedRoute, private router: Router, private timerService: TimerService, page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
    const url = this.router.url;
    if (url.substring(url.length - 3) !== 'add') {
      [this.presetting] = this.route.snapshot.data['presetting'];
    }
  }

  add(): void {
    this.timerService.addTimerPresetting(this.description);
    this.navigateBackToMaster();
  }

  update(id: number): void {
    this.timerService.updateTimerPresetting({ id, description: this.description });
    this.navigateBackToMaster();
  }

  delete(id: number): void {
    this.timerService.deleteTimerPresettingById(id);
    this.navigateBackToMaster();
  }

  get description(): string {
    const tf = <TextField>this.textField.nativeElement;
    return tf.text;
  }

  private navigateBackToMaster(): void {
    this.router.navigateByUrl('/timerPresettings').then();
  }
}
