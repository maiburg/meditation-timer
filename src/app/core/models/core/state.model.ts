import { PtItem, TimerPresetting } from '@core/models/domain';

export interface State {
  timerPresettings: TimerPresetting[];
  backlogItems: PtItem[];
}
