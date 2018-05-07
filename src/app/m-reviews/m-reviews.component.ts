import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { MReviewsService } from '../_services/m-reviews.service';

@Component({
  selector: 'm-reviews',
  templateUrl: './m-reviews.component.html',
  styleUrls: ['./m-reviews.component.css'],
  providers: [ApiCallerService, MReviewsService]
})
export class MReviewsComponent implements OnInit {

  feedbacks:object;
  usersImgPath:string = "/assets/images/upload/";
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

  insertFeedback(newFeedback) {
    this.feedbacks[0].message = newFeedback.controls.message.value;
    this.feedbacks[0].name = newFeedback.controls.from.value;
    this.feedbacks[0].photo = newFeedback.controls.photo.value;
  }


}
