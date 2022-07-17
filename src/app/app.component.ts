import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SqliteService } from '@app/core/services';

console.log('AppComponent loaded');

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private readonly sqlite: SqliteService, private readonly translate: TranslateService) {
    translate.setDefaultLang('de');
    translate.use('de');
  }

  ngOnInit(): void {
    this.sqlite.initDB();
  }
}
