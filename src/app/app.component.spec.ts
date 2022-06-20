import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from '@app/app.component';
import { SqliteService } from '@app/core/services';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sqlite: SqliteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [SqliteService]
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
