import { TestBed } from '@angular/core/testing';

import { UnloggedGuardService } from './unloggedGuard.service';

describe('UnloggedGuardService', () => {
  let service: UnloggedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnloggedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
