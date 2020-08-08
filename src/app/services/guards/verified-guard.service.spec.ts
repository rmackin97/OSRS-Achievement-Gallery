import { TestBed } from '@angular/core/testing';

import { VerifiedGuardService } from './verified-guard.service';

describe('VerifiedGuardService', () => {
  let service: VerifiedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifiedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
