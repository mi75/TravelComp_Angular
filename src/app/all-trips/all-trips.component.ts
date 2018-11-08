import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFormat } from "../trip-format";

@Component({
  selector: 'all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css'],
  providers: [ApiCallerService]
})
export class AllTripsComponent implements OnInit {

  tourImgPath:string = ApiCallerService.webAdddr + 'api/images?useBodyPath=true&id=';

  tours:tripFormat[];

  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    this.load.getData('api/trips/allDisplayingTrips').subscribe( res => {
      this.tours = res;
    });
  }

}
