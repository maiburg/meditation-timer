import { Component } from '@angular/core';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLabel = false;

  onTap(): void {
    this.showLabel = !this.showLabel;
  }
}
