import { PtItem, PtUser } from '@core/models/domain';
import { PresetType } from '@shared/models/ui/types/presets';

export interface State {
  backlogItems: PtItem[];
  currentUser: PtUser;
  currentSelectedItem: PtItem;
  selectedPreset: PresetType;
}
