import { TestBed } from '@angular/core/testing';

import { ReimbService } from './reimb.service';

describe('ReimbService', () => {
  let service: ReimbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReimbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
