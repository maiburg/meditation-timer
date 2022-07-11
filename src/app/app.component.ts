import { Component, OnInit } from '@angular/core';
import { SqliteService } from '@app/core/services';
import { Device } from '@nativescript/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private sqlite: SqliteService, private translate: TranslateService) {
    translate.setDefaultLang('de');
    translate.use('de');
  }

  ngOnInit(): void {
    this.sqlite.initDB();
  }
}
