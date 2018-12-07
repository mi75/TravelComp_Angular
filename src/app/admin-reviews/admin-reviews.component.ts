import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { FeedbackFormat } from '../feedback-format';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css'],
  providers: [ApiCallerService]
})
export class AdminReviewsComponent implements OnInit {

  feedbacks:FeedbackFormat[];

  constructor(
    private load: ApiCallerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.load.getData('api/admin/allFeedbacks')
    .subscribe(
      res => this.feedbacks = res,
      error => error.status=='401' ? this.router.navigate(['login']) : alert(error)
    );
  }

  delFeedback(id, index) {
    if (confirm('Уверены, что хотите удалить отзыв?')) {
      this.load.postData('api/admin/delFeedback',  {"id": id})
      .subscribe(
        success => this.feedbacks.splice(index, 1),
        error => error.status=='401' ? this.router.navigate(['login']) : alert('Sending Error')
      );
    }
  }

}
