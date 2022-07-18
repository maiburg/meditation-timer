import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

console.log('AppComponent loaded');

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private readonly translate: TranslateService) {
    translate.setDefaultLang('de');
    translate.use('de');
  }
}
