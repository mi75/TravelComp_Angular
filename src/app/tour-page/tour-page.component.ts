import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.css']
})
export class TourPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getTrip(title) {
    alert(title);
  }

}
