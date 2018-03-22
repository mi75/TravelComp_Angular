import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm-slider2',
  templateUrl: './m-slider2.component.html',
  styleUrls: ['./m-slider2.component.css']
})
export class MSlider2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slides=[
    {
        title: 'южная европа',
        showing: true,
        pic: ''
      },
      {
        title: 'итальянская ривьера',
        showing: false,
        pic: ''
      },
      {
        title: 'средиземноморье',
        showing: false,
        pic: ''
      }
    ];

}
