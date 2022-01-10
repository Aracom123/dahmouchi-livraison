import { TestBed } from '@angular/core/testing';

import { GroupeActionService } from './groupe-action.service';

describe('GroupeActionService', () => {
  let service: GroupeActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
