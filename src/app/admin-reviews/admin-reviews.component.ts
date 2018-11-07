import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { FeedbackFormat } from '../feedback-format';

@Component({
  selector: 'admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css'],
  providers: [ApiCallerService]
})
export class AdminReviewsComponent implements OnInit {

  feedbacks:FeedbackFormat[];

  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    this.load.getData('api/allFeedbacks').subscribe( res => {
      this.feedbacks = res;
    });
  }

  delFeedback(id, index) {
    if (confirm('Уверены, что хотите удалить отзыв?')) {
      this.load.postData('api/delFeedback',  {"id": id})
      .subscribe(
        success => {
          this.feedbacks.splice(index, 1);
        },
        error => {alert('Sending Error')}
      );
    }
  }

}
