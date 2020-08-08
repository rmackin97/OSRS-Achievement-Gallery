import { TestBed } from '@angular/core/testing';

import { CurrProfileGuardService } from './currProfileGuard.service';

describe('CurrProfile.GuardService', () => {
  let service: CurrProfileGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrProfileGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
