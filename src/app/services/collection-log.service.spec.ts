import { TestBed } from '@angular/core/testing';

import { CollectionLogService } from './collection-log.service';

describe('LogEntryService', () => {
  let service: CollectionLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
