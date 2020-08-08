import { TestBed } from '@angular/core/testing';

import { UnverifiedGuardService } from './unverifiedGuard.service';

describe('UnverifiedGuardService', () => {
  let service: UnverifiedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnverifiedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
