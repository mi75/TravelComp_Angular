import { Component, OnInit, OnDestroy } from '@angular/core';
import { MSliderService } from '../_services/m-slider.service';
import { Slide } from '../slide';

@Component({
  selector: 'main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css'],
  providers: [MSliderService]
})
export class MainSliderComponent implements OnInit, OnDestroy {

  ngOnDestroy() {
    this.sls.endAnimation();
  }

  constructor(
    private sls: MSliderService
  ) { }

  slides:Slide[] = this.sls.getSlides();
  knobs:boolean[] = this.sls.getKnobs();

  ngOnInit() {
    this.sls.startAnimation();
  }

  goToPic(p) {
    this.sls.goToPic(p);
  }

}
