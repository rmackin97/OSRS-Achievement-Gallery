import { TestBed } from '@angular/core/testing';

import { LoggedGuardService } from './loggedGuard.service';

describe('LoggedGuardService', () => {
  let service: LoggedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
