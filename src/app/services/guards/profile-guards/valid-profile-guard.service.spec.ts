import { TestBed } from '@angular/core/testing';

import { ValidProfileGuardService } from './valid-profile-guard.service';

describe('ValidProfileGuardService', () => {
  let service: ValidProfileGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidProfileGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
