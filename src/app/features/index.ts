import { TimerModule } from '@features/timer/timer.module';
import { BacklogModule } from '@features/backlog/backlog.module';

export * from '@features/timer/timer.module';
export * from '@features/backlog/backlog.module';

export const FEATURE_MODULES = [TimerModule, BacklogModule];
