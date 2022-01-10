import { TestBed } from '@angular/core/testing';

import { MatRoulantService } from './mat-roulant.service';

describe('MatRoulantService', () => {
  let service: MatRoulantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatRoulantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
