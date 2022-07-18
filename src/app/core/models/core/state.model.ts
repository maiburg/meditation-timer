import { PtItem, PtUser } from '@core/models/domain';

export interface State {
  backlogItems: PtItem[];
  currentUser: PtUser;
}
