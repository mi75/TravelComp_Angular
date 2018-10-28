import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFormatFeaturesPics } from "../trip-format";
import { tripFeaturesFormat } from "../tripfeatures-format";

@Component({
  selector: 'tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.css'],
  providers: [ApiCallerService]
})

export class TourPageComponent implements OnInit {

  tour:tripFormatFeaturesPics = new tripFormatFeaturesPics();
  loaded: boolean = false;
  features:string[];
  featuresPics:string[];
  tripFeatures:tripFeaturesFormat[] = [];
  getImgPath:string = ApiCallerService.webAdddr + 'api/images?useBodyPath=true&id=';

  constructor(
    private route: ActivatedRoute,
    private load: ApiCallerService
  ) {}
  
  
  ngOnInit() {

    let selectedTour = this.route.snapshot.paramMap.get('tourId');
    this.load.getData('api/trips/tourPage?tripId=' + selectedTour).subscribe( res => {
      this.tour = res[0];
      this.features = res[0].features.split(',');
      this.featuresPics = res[0].featuresPics.split(',');
      for (let i=0; i<this.features.length; i++){
        this.tripFeatures[i] = new tripFeaturesFormat();
        this.tripFeatures[i].description = this.features[i];
        this.tripFeatures[i].pic = this.featuresPics[i];
      };
      this.loaded = true; // for displaying only after load end
      window.scrollTo(0, 0);
    });


  }
}

