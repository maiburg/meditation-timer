import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { State } from '@core/models/core';
import { PtItem } from '@core/models/domain';
import { StoreService } from '@core/services';
import { BacklogService } from '@features/backlog/services';

@Component({
  selector: 'pt-backlog-detail-page',
  templateUrl: 'detail.page.component.pug'
})
export class DetailPageComponent implements OnInit {
  currentSelectedItem$: Observable<PtItem> = this.store.select<PtItem>((state: State) => state.currentSelectedItem);

  constructor(
    private activatedRoute: ActivatedRoute,
    private backlogService: BacklogService,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.backlogService.getItemFromCacheOrServer(parseInt(this.activatedRoute.snapshot.params['id']));
  }

  onNavBackTap() {
    // TODO: navigate back to previous page
  }
}
