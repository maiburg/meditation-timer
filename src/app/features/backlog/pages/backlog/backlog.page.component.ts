import { Component, OnInit } from '@angular/core';

import { State } from '@core/models/core';
import { PtItem } from '@core/models/domain';
import { StoreService } from '@core/services';
import { BacklogService } from '@features/backlog/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'pt-backlog',
  templateUrl: 'backlog.page.component.html'
})
export class BacklogPageComponent implements OnInit {
  items$: Observable<PtItem[]> = this.store.select<PtItem[]>((state: State) => state.backlogItems);

  constructor(private backlogService: BacklogService, private store: StoreService) {}

  ngOnInit() {
    this.backlogService.fetchItems();
  }

  selectListItem(item: PtItem) {
    // navigate to detail page
  }

  onAddTap(args) {
    // show add item dialog
  }
}
