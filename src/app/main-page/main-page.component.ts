import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFormat } from "../trip-format";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  tourImgPath:string = ApiCallerService.webAdddr + 'api/images?useBodyPath=true&id=';

  tours:tripFormat[];

  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.load.getData('api/trips/popular').subscribe( res => {
      this.tours = res;
    });
  }

}
