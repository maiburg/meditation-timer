import { StoreService } from '@core/services/store.service';
import { SqliteService } from '@core/services/sqlite.service';

export * from '@app/core/services/sqlite.service';
export * from '@core/services/store.service';

export const SERVICES = [StoreService, SqliteService];
