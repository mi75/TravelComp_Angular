import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuFixedPosition: boolean = false;
  menuVisible: boolean = false;

  @ViewChild('header')
    myHeader: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    let distanceY = window.pageYOffset || document.documentElement.scrollTop;
    let headHeight = this.myHeader.nativeElement.offsetHeight;
    (distanceY > headHeight) ? this.menuFixedPosition=true : this.menuFixedPosition=false
  }

  menuExpand(event) {
    event.preventDefault();
    this.menuVisible = !this.menuVisible;
  }

}
