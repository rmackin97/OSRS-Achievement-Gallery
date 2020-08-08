import { TestBed } from '@angular/core/testing';

import { HasProfilesGuardService } from './has-profile-guard.service';

describe('HasProfileGuardService', () => {
  let service: HasProfilesGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasProfilesGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
