import { TestBed } from '@angular/core/testing';

import { AddNotesServiceService } from './add-notes-service.service';

describe('AddNotesServiceService', () => {
  let service: AddNotesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNotesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
