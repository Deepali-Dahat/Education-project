import { TestBed } from '@angular/core/testing';

import { ForgotpsswrdServiceService } from './forgotpsswrd-service.service';

describe('ForgotpsswrdServiceService', () => {
  let service: ForgotpsswrdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotpsswrdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
