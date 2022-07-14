import { Component, OnInit } from '@angular/core';
import { SqliteService, StoreService } from '@app/core/services';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { State } from '@core/models/core';
import { PtItem } from '@core/models/domain';
import { BacklogService } from '@features/backlog/services';

console.log('AppComponent loaded');

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items$: Observable<PtItem[]> = this.store.select((state: State) => state.backlogItems);

  constructor(
    private readonly sqlite: SqliteService,
    private readonly translate: TranslateService,
    private readonly store: StoreService,
    private readonly backlogService: BacklogService
  ) {
    translate.setDefaultLang('de');
    translate.use('de');
  }

  ngOnInit(): void {
    this.backlogService.fetchItems();
    this.sqlite.initDB();
  }
}
