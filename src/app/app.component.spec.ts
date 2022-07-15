import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppComponent } from '@app/app.component';
import { SqliteService } from '@app/core/services';
import { TranslateLoaderStub } from '@app/utils';
import { AppConfigModule } from '@src/config/app-config.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sqlite: SqliteService;

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
      providers: [SqliteService, TranslateService]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sqlite = TestBed.inject(SqliteService);
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('call sqlite.initDB()', () => {
      const spy = spyOn(sqlite, 'initDB');

      component.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
