import { Component, OnInit } from '@angular/core';
import { ApiGetCallerService } from '../_services/api-get-caller.service';

@Component({
  selector: 'm-reviews',
  templateUrl: './m-reviews.component.html',
  styleUrls: ['./m-reviews.component.css'],
  providers: [ApiGetCallerService]
})
export class MReviewsComponent implements OnInit {

  feedbacks;
  // private TMP = "D:/Work/tmp/P3TravelComp/upload/default_customer.jpg";
  // private startRow=0;

  constructor(
    private load: ApiGetCallerService
  ) { }

  ngOnInit() {
    this.load.getData('http://127.0.0.1:8080/api/feedback?startRow=0').subscribe( res => {
      this.feedbacks = res.rows;
    } )
  }

}
