import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiGetCallerService } from '../_services/api-get-caller.service';
import { MReviewsService } from '../_services/m-reviews.service';

@Component({
  selector: 'm-reviews',
  templateUrl: './m-reviews.component.html',
  styleUrls: ['./m-reviews.component.css'],
  providers: [ApiGetCallerService, MReviewsService]
})
export class MReviewsComponent implements OnInit {

  feedbacks;
  // @Input() usersImgPath:string = "/assets/images/upload/";
  // @Output() feedbacksForwarding = new EventEmitter();
  usersImgPath:string = "/assets/images/upload/";
  startRow=0;
  rowsCounter = 0;
  defCustPhoto='default_customer.jpg';


  constructor(
    private load: ApiGetCallerService,
    private check: MReviewsService
  ) { }


  ngOnInit() {
    this.load.getData('api/feedback?startRow=0').subscribe( res => {
      this.feedbacks = res.rows;
      this.rowsCounter = res.count;
      this.check.checkExist(this.feedbacks, this.defCustPhoto)
    } )
  }

  fbForwarding(){
    this.startRow += 3;
    if (this.startRow > this.rowsCounter - 3) this.startRow = this.rowsCounter - 3;
    this.load.getData('api/feedback?startRow='+this.startRow).subscribe( res => {
      this.feedbacks = res.rows;
      this.check.checkExist(this.feedbacks, this.defCustPhoto)
    } )
  }

  fbReverse(){
    this.startRow -= 3;
    if (this.startRow < 0) this.startRow = 0;
    this.load.getData('api/feedback?startRow='+this.startRow).subscribe( res => {
      this.feedbacks = res.rows;
      this.check.checkExist(this.feedbacks, this.defCustPhoto)
    } )
  }

}
