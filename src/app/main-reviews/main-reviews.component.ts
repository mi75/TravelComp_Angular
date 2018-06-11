import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { MReviewsService } from '../_services/m-reviews.service';
import { FeedbackFormat } from '../feedback-format';

@Component({
  selector: 'main-reviews',
  templateUrl: './main-reviews.component.html',
  styleUrls: ['./main-reviews.component.css'],
  providers: [ApiCallerService, MReviewsService]
})
export class MainReviewsComponent implements OnInit {

  feedbacks:FeedbackFormat[];
  usersImgPath:string = ApiCallerService.webAdddr + 'src/assets/images/upload/';
  startRow:number = 0;
  rowsCounter:number = 0;
  defCustPhoto:string = 'default_customer.jpg';

  constructor(
    private load: ApiCallerService,
    private check: MReviewsService
  ) { }

  ngOnInit() {
    this.getFeedback();
  }

  getFeedback() {
    this.load.getData('api/feedback?startRow=0').subscribe( res => {
      this.feedbacks = res.rows;
      this.rowsCounter = res.count;
      this.check.checkExist(this.feedbacks, this.defCustPhoto);
    } );
    this.startRow = 0;
  }

  fbForwarding() {
    this.startRow += 3;
    if (this.startRow > this.rowsCounter - 3) this.startRow = this.rowsCounter - 3;
    this.load.getData('api/feedback?startRow=' + this.startRow).subscribe( res => {
      this.feedbacks = res.rows;
      this.check.checkExist(this.feedbacks, this.defCustPhoto);
    } )
  }

  fbReverse() {
    this.startRow -= 3;
    if (this.startRow < 0) this.startRow = 0;
    this.load.getData('api/feedback?startRow=' + this.startRow).subscribe( res => {
      this.feedbacks = res.rows;
      this.check.checkExist(this.feedbacks, this.defCustPhoto);
    } );
  }

  insertFeedback(newFeedback:FeedbackFormat) {
    if (this.startRow===0) {
      for (let i=2; i>0; i--) {
        this.feedbacks[i].name = this.feedbacks[i-1].name;
        this.feedbacks[i].message = this.feedbacks[i-1].message;
        if (this.feedbacks[i-1].base64Pic) {
          this.feedbacks[i].base64Pic = this.feedbacks[i-1].base64Pic;
        } else {
          this.feedbacks[i].base64Pic = null;
          this.feedbacks[i].photo = this.feedbacks[i-1].photo;
        }
        this.feedbacks[i].date = this.feedbacks[i-1].date;
      }
      this.rowsCounter += 1;
      this.feedbacks[0].message = newFeedback.message;
      this.feedbacks[0].name = newFeedback.name;
      if (newFeedback.base64Pic) {
        this.feedbacks[0].base64Pic = newFeedback.base64Pic;
      } else {
        this.feedbacks[0].base64Pic = null;
        this.feedbacks[0].photo = this.defCustPhoto;
      }
      this.feedbacks[0].date = newFeedback.date;
    } else {
        this.getFeedback();
    }
  }


}
