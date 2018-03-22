import { TestBed, inject } from '@angular/core/testing';

import { GetAdminDataService } from './get-admin-data.service';

describe('GetAdminDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAdminDataService]
    });
  });

  it('should be created', inject([GetAdminDataService], (service: GetAdminDataService) => {
    expect(service).toBeTruthy();
  }));
});
