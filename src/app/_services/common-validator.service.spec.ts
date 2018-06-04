import { TestBed, inject } from '@angular/core/testing';

import { CommonValidatorService } from './common-validator.service';

describe('CommonValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonValidatorService]
    });
  });

  it('should be created', inject([CommonValidatorService], (service: CommonValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
