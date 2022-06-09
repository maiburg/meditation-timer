import { Component, OnInit } from '@angular/core';
import { SqliteService } from '@app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private sqlite: SqliteService, private router: Router) {}

  ngOnInit(): void {
    this.sqlite.initDB();
  }

  onTap(): void {
    this.router.navigate(['/timer']).then(() => console.log('CURRENT ROUTE: ', this.router.url));
  }
}
