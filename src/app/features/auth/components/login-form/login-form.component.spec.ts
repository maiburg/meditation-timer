import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { faker } from '@faker-js/faker/locale/de';

import { TranslateLoaderStub } from '@app/utils';
import { LoginFormComponent } from '@features/auth/components/login-form/login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderStub }
        })
      ],
      declarations: [LoginFormComponent],
      providers: [TranslateService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onLoginTap() should', () => {
    it('call loginInitiated.emit() if arg is TRUE', () => {
      const spy = spyOn(component.loginInitiated, 'emit');
      const expected = { username: faker.internet.email(), password: 'secret' };
      component.email = expected.username;
      component.password = expected.password;

      component.onLoginTap(true);

      expect(spy).toHaveBeenCalledWith(expected);
    });

    it('NOT call loginInitiated.emit() if arg is FALSE', () => {
      const spy = spyOn(component.loginInitiated, 'emit');

      component.onLoginTap(false);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
