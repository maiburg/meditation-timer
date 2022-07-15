import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { PtItem } from '@core/models/domain';

@Component({
  selector: 'pt-list-item',
  templateUrl: 'pt-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtListItemComponent {
  @Input() item: PtItem;

  constructor() {}
}
