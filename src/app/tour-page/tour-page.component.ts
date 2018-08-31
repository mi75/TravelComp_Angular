import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFormatFull } from "../trip-format";

@Component({
  selector: 'tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.css'],
  providers: [ApiCallerService]
})

export class TourPageComponent implements OnInit {

  tour:tripFormatFull = new tripFormatFull();
  loaded: boolean = false;
  features:string[];
  featuresPics:string[];

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
      this.loaded = true;
    });

    // GET tourPage by tripId

    // var key = "tour" + tripId;
    // if (Cache.ContainsKey()){ //tour16
    //   return Cache.Get(key);
    // } else {
    //   var trip = DBOperations.Get....;
    //   Cache.Set(key, trip);
    //   return trip;
    // }

    // /////////////
    // Edit trip.
    // Cache.invalidate(key);

  }
}

