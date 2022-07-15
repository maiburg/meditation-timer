import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ItemEventData, Observable } from '@nativescript/core';

import { PtItem } from '@core/models/domain';

@Component({
  selector: 'pt-list',
  templateUrl: 'pt-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtListComponent {
  @Input() items: PtItem[];
  @Output() listItemSelected: EventEmitter<PtItem> = new EventEmitter<PtItem>();

  constructor() {}

  listItemTap(args: ItemEventData) {
    const list: Observable = args.object;
    const item: PtItem = (<any>list).items[args.index];
    this.listItemSelected.emit(item);
  }
}
