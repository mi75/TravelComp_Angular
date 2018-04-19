import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'headercmp',
  templateUrl: './headercmp.component.html',
  styleUrls: ['./headercmp.component.css']
})
export class HeadercmpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mf: boolean = false;
  @ViewChild("header")
    myHeader: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    let distanceY = window.pageYOffset || document.documentElement.scrollTop;
    // let headHeight = document.getElementById('header').offsetHeight;
    let headHeight = this.myHeader.nativeElement.offsetHeight;
    (distanceY > headHeight) ? this.mf=true : this.mf=false
  }

}
