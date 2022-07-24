import { Component } from '@angular/core';

import { NavigationService } from '@core/services';
import { PresetType } from '@shared/models/ui/types/presets';

@Component({
  selector: 'pt-menu',
  templateUrl: 'menu.component.pug',
  styleUrls: ['menu.component.sass']
})
export class MenuComponent {
  constructor(private navigationService: NavigationService) {}

  onSelectPresetTap(preset: PresetType) {
    this.navigationService.navigate(['backlog', preset]).then();
  }

  onSettingsTap() {
    this.navigationService.navigate(['settings']).then();
  }
}
