import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker/locale/de';

import { APP_CONFIG } from '@src/config/app-config.module';
import { PtItem } from '@core/models/domain';
import { ServerErrorHandlerService, StoreService } from '@core/services';
import { BacklogPageComponent } from '@features/backlog/pages';
import { BacklogRepository } from '@features/backlog/repositories';
import { BacklogService } from '@features/backlog/services';

describe('BacklogPageComponent', () => {
  let component: BacklogPageComponent;
  let fixture: ComponentFixture<BacklogPageComponent>;
  let backlogService: BacklogService, store: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BacklogPageComponent],
      providers: [
        BacklogService,
        BacklogRepository,
        StoreService,
        ServerErrorHandlerService,
        { provide: APP_CONFIG, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    backlogService = TestBed.inject(BacklogService);
    store = TestBed.inject(StoreService);
    fixture = TestBed.createComponent(BacklogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('call backlogService.fetchItems()', () => {
      const spy = spyOn(backlogService, 'fetchItems');

      component.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('items$ should', () => {
    it('get PtItem array from store', () => {
      const backlogItems = [{ description: faker.lorem.words(10) } as PtItem];

      store.set({ backlogItems });

      component.items$.subscribe((val: PtItem[]) => {
        expect(val).toEqual(backlogItems);
      });
    });
  });
});
