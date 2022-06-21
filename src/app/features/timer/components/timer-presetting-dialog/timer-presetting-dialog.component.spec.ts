import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { faker } from '@faker-js/faker/locale/de';

import { TimerPresettingDialogComponent } from '@app/features/timer/components';
import { SqliteService } from '@core/services';
import { TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';

describe('TimerPresettingDialogComponent', () => {
  let component: TimerPresettingDialogComponent;
  let fixture: ComponentFixture<TimerPresettingDialogComponent>;
  let timerService: TimerService, router: Router;

  const id = faker.datatype.number({ min: 1, max: 999999 });
  const description = faker.lorem.words(10);
  const presetting: TimerPresetting = { id, description };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TimerPresettingDialogComponent],
      providers: [
        TimerService,
        SqliteService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { presetting: [presetting] }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    timerService = TestBed.inject(TimerService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TimerPresettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit() should', () => {
    it('retrieve timerPresetting from ActivatedRoute', () => {
      component.ngOnInit();

      expect(component.presetting).toBe(presetting);
    });
  });

  describe('add() should', () => {
    it('call timerService.addTimerPresetting() and navigateBackToMaster()', () => {
      const addSpy = spyOn(timerService, 'addTimerPresetting');
      const navigateSpy = spyOn<any>(component, 'navigateBackToMaster');
      spyOnProperty(component, 'description', 'get').and.returnValue(description);

      component.add();

      expect(addSpy).toHaveBeenCalledOnceWith(description);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update() should', () => {
    it('call timerService.updateTimerPresetting() and navigateBackToMaster()', () => {
      const updateSpy = spyOn(timerService, 'updateTimerPresetting');
      const navigateSpy = spyOn<any>(component, 'navigateBackToMaster');
      spyOnProperty(component, 'description', 'get').and.returnValue(description);

      component.update(id);

      expect(updateSpy).toHaveBeenCalledOnceWith(presetting);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete() should', () => {
    it('call timerService.deleteTimerPresettingById() and navigateBackToMaster()', () => {
      const deleteSpy = spyOn(timerService, 'deleteTimerPresettingById');
      const navigateSpy = spyOn<any>(component, 'navigateBackToMaster');
      spyOnProperty(component, 'description', 'get').and.returnValue(description);

      component.delete(id);

      expect(deleteSpy).toHaveBeenCalledOnceWith(id);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('description should', () => {
    it('return the text fields text value', () => {
      component.textField.nativeElement.value = description;

      expect(component.description).toBe(description);
    });
  });

  describe('navigateBackToMaster() should', () => {
    it('call router.navigateByUrl()', () => {
      const spy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(null));

      component['navigateBackToMaster']();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
