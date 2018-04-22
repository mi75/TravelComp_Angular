import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'headercmp',
  templateUrl: './headercmp.component.html',
  styleUrls: ['./headercmp.component.css']
})
export class HeadercmpComponent implements OnInit {

  isExpanded: boolean;

  constructor() {
    this.isExpanded = true;
   }

  ngOnInit() {
  }

  mf: boolean = false;
  @ViewChild("header")
    myHeader: ElementRef;
  @ViewChild("mainMenu")
    myMenu: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    let distanceY = window.pageYOffset || document.documentElement.scrollTop;
    // let headHeight = document.getElementById('header').offsetHeight;
    let headHeight = this.myHeader.nativeElement.offsetHeight;
    (distanceY > headHeight) ? this.mf=true : this.mf=false
  }

  // menuExpand() {
  //   let pull = document.getElementById('pull');
  //   let menu = this.myMenu.nativeElement;
  //   let menuHeight = menu.height();
  //   console.log(menuHeight);

  //       menu.slideToggle();

  //   resize() {
  //       var w = $(window).width();
  //       if (w > 500 && menu.is(':hidden')) {
  //           menu.removeAttr('style');
  //       }
  //   };
  // }

}
