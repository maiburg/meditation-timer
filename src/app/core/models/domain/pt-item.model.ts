import { PtObjectBase, PtTask, PtComment, PtUser } from '@core/models/domain';
import { PriorityEnum, StatusEnum } from '@core/models/domain/enums';
import { PtItemType } from '@core/models/domain/types';

export interface PtItem extends PtObjectBase {
  description?: string;
  type: PtItemType;
  estimate: number;
  priority: PriorityEnum;
  status: StatusEnum;
  assignee: PtUser;
  tasks: PtTask[];
  comments: PtComment[];
}
