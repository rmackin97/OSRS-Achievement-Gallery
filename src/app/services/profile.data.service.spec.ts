import { TestBed } from '@angular/core/testing';

import { ProfileDataService } from './profile.data.service';

describe('Profile.DataService', () => {
  let service: ProfileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
