import { TestBed } from '@angular/core/testing';

import { AddEBookServiceService } from './add-ebook-service.service';

describe('AddEBookServiceService', () => {
  let service: AddEBookServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEBookServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
