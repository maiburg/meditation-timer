import { BacklogModule } from '@features/backlog/backlog.module';
import { AuthModule } from '@features/auth/auth.module';

export * from '@features/auth/auth.module';
export * from '@features/backlog/backlog.module';

export const FEATURE_MODULES = [AuthModule, BacklogModule];
