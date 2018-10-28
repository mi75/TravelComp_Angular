import { Component, OnInit, OnDestroy } from '@angular/core';
import { MSliderService } from '../_services/m-slider.service';
import { Slide } from '../slide';
import { ApiCallerService } from '../_services/api-caller.service';


@Component({
  selector: 'main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css'],
  providers: [MSliderService, ApiCallerService]
})
export class MainSliderComponent implements OnInit, OnDestroy {

  tourImgPath:string = ApiCallerService.webAdddr + 'api/images?useBodyPath=true&id=';

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
