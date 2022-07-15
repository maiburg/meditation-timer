import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppComponent } from '@app/app.component';
import { LoggerService, SqliteService } from '@app/core/services';
import { TranslateLoaderStub } from '@app/utils';
import { ServerErrorHandlerService, StoreService } from '@core/services';
import { BacklogRepository } from '@features/backlog/repositories';
import { BacklogService } from '@features/backlog/services';
import { AppConfigModule } from '@src/config/app-config.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sqlite: SqliteService, backlogService: BacklogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppConfigModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderStub }
        })
      ],
      declarations: [AppComponent],
      providers: [
        SqliteService,
        TranslateService,
        LoggerService,
        StoreService,
        BacklogService,
        BacklogRepository,
        HttpClient,
        ServerErrorHandlerService
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sqlite = TestBed.inject(SqliteService);
    backlogService = TestBed.inject(BacklogService);
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('call sqlite.initDB()', () => {
      const spy = spyOn(sqlite, 'initDB');

      component.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('call backlogService.fetchItems()', () => {
      const spy = spyOn(backlogService, 'fetchItems');

      component.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
