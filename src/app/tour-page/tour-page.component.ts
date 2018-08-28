import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.css']
})
export class TourPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {}

  private id: string;
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('tourId');
    console.log("id = " + this.id);
  }

  

}
