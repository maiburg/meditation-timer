import { Component, OnInit } from '@angular/core';
import { SqliteService } from '@app/core/services';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly sqlite: SqliteService) {
    sqlite.initDB();
  }

  ngOnInit(): void {}
}
