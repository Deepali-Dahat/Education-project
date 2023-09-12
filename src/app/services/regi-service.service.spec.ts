import { TestBed } from '@angular/core/testing';

import { RegiServiceService } from './regi-service.service';

describe('RegiServiceService', () => {
  let service: RegiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
