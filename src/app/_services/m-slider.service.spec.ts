import { TestBed, inject } from '@angular/core/testing';

import { MSliderService } from './m-slider.service';

describe('MSliderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MSliderService]
    });
  });

  it('should be created', inject([MSliderService], (service: MSliderService) => {
    expect(service).toBeTruthy();
  }));
});
