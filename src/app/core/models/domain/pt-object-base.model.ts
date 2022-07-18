export interface PtObjectBase {
  id: number;
  title?: string;
  dateCreated: Date | string;
  dateModified: Date | string;
  dateDeleted?: Date | string;
}
