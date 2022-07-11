import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Page } from '@nativescript/core';
import { faker } from '@faker-js/faker/locale/de';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { TimerPresettingsComponent } from '@app/features/timer/components';
import { TranslateLoaderStub } from '@app/utils';
import { TimerPresetting } from '@core/models/domain';
import { SqliteService } from '@core/services';

describe('TimerPresettingsComponent', () => {
  let component: TimerPresettingsComponent;
  let fixture: ComponentFixture<TimerPresettingsComponent>;

  const timer1: TimerPresetting = { id: 1, description: faker.lorem.words(10) };
  const timer2: TimerPresetting = { id: 2, description: faker.lorem.words(10) };
  const presettings: TimerPresetting[] = [timer1, timer2];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderStub }
        })
      ],
      declarations: [TimerPresettingsComponent],
      providers: [
        SqliteService,
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { presettings }
            }
          }
        },
        Page
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerPresettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('retrieve timers from ActivatedRoute', () => {
      component.ngOnInit();

      expect(component.presettings).toEqual(presettings);
    });
  });
});
