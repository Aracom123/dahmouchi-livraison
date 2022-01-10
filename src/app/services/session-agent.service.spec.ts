import { TestBed } from '@angular/core/testing';

import { SessionAgentService } from './session-agent.service';

describe('SessionAgentService', () => {
  let service: SessionAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
