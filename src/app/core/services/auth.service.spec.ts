import { TestBed } from '@angular/core/testing';

import { AuthService } from '@core/services';
import { AppConfigModule } from '@src/config/app-config.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppConfigModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
