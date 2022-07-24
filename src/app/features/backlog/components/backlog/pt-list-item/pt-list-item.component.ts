import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ItemType } from '@core/constants';
import { PtItem } from '@core/models/domain';

@Component({
  selector: 'pt-list-item',
  templateUrl: 'pt-list-item.component.pug',
  styleUrls: ['pt-list-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtListItemComponent {
  @Input() item: PtItem;

  constructor() {}

  public getIndicatorClass(item: PtItem): string {
    return ItemType.indicatorClassFromType(item.type);
  }
}
