import { Component, OnInit } from '@angular/core';
import { SliderService } from '../_services/slider.service';

@Component({
  selector: 'm-slider2',
  templateUrl: './m-slider2.component.html',
  styleUrls: ['./m-slider2.component.css'],
  providers: [SliderService]
})
export class MSlider2Component implements OnInit {

  // currentSlide = 0;
  // slideInterval = setInterval(nextSlide, 2000);

  constructor(
    private sls: SliderService
  ) { }

  slides=this.sls.getSlides();

  ngOnInit() {
    this.sls.startAnimation();
  }

}
