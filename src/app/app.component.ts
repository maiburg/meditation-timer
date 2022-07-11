import { Component, OnInit } from '@angular/core';
import { LoggerService, SqliteService } from '@app/core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private sqlite: SqliteService,
    private translate: TranslateService,
    private loggerService: LoggerService
  ) {
    translate.setDefaultLang('de');
    translate.use('de');

    loggerService.log('This is a logging!');
    loggerService.warn('This is a warning!');
    loggerService.error('This is an error!');
  }

  ngOnInit(): void {
    this.sqlite.initDB();
  }
}
