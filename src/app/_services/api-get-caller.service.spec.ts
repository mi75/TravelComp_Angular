import { TestBed, inject } from '@angular/core/testing';

import { ApiGetCallerService } from './api-get-caller.service';

describe('ApiGetCallerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGetCallerService]
    });
  });

  it('should be created', inject([ApiGetCallerService], (service: ApiGetCallerService) => {
    expect(service).toBeTruthy();
  }));
});
