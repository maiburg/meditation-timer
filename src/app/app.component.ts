import { Component, OnInit } from '@angular/core';
import { LoggerService, SqliteService } from '@app/core/services';
import { TranslateService } from '@ngx-translate/core';

console.log('AppComponent loaded');

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private sqlite: SqliteService, private translate: TranslateService) {
    translate.setDefaultLang('de');
    translate.use('de');

    console.log('AppComponent constructed');
  }

  ngOnInit(): void {
    this.sqlite.initDB();
  }
}
