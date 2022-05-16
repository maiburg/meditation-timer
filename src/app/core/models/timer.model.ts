export interface ITimer {
  description: string;
}

export class Timer implements ITimer {
  id: number;
  description: string;
}
