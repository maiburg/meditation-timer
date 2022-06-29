import { StorageWebService } from '@core/services/storage/storage-web.service';
import { StorageNsService } from '@core/services/storage/storage-ns.service';
import { StoreService } from '@core/services/store.service';
import { SqliteService } from '@core/services/sqlite.service';

export * from '@core/services/store.service';
export * from '@app/core/services/sqlite.service';
export * from '@app/core/services/storage/storage-ns.service';
export * from '@app/core/services/storage/storage-web.service';

export const SERVICES = [StorageNsService, StorageWebService, StoreService, SqliteService];
