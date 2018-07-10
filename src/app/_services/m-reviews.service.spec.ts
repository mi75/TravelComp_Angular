import { TestBed, inject } from '@angular/core/testing';

import { MReviewsService } from './m-reviews.service';

describe('MReviewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MReviewsService]
    });
  });

  it('should be created', inject([MReviewsService], (service: MReviewsService) => {
    expect(service).toBeTruthy();
  }));
});
