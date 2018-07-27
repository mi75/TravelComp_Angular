import { Injectable } from '@angular/core';
import {SLIDES} from '../SLIDES';
import { element } from 'protractor';
import { Slide } from '../slide';

import { ApiCallerService } from '../_services/api-caller.service';


@Injectable({
  providedIn: 'root'
})
export class MSliderService {

  constructor(
		private load: ApiCallerService
	) { }

  currentSlide:number = 0;
  animation:NodeJS.Timer;
  knobs:boolean[] = [];

  // public getSlides(): Slide[] {
  //   for (let i=0; i<SLIDES.length; i++) {
  //     if (SLIDES[i].showing) {
  //       this.currentSlide = i;
  //     }
  //   }
  //   return SLIDES;
	// }

	// public static readonly sliderPicAddr = '/assets/images/bodycmp/';
	mainSlides:Slide[] = [];
	
	// public getSlides(): Slide[] {
  //   this.load.getData('api/trips/display').subscribe( res => {
	// 		for (let i=0; i<res.length; i++) {
	// 			var newSlide:Slide;
	// 			newSlide.title = res[i].title;
	// 			if (i=0) {
	// 				newSlide.showing = true;
	// 			}  else {newSlide.showing = false};
	// 			newSlide.pic = '/assets/images/bodycmp/' + res[i].picFile;
	// 			this.mainSlides.push(newSlide);
	// 		}
	// 	});
  //   return this.mainSlides;
	// }
	
	public getSlides(): Slide[] {
    this.load.getData('api/trips/display').subscribe( res => {
			for (let i=0; i<res.length; i++) {
				this.mainSlides.push(SLIDES[i]);
				this.mainSlides[i].title = res[i].title;
				this.mainSlides[i].pic = '/assets/images/bodycmp/' + res[i].picFile;
			}
		});
    return this.mainSlides;
  }

	getKnobs() {
		for (let i=0; i<this.mainSlides.length; i++) {
			this.knobs.push(this.mainSlides[i].showing);
		}
		return this.knobs;
	}

	startAnimation() {
		this.animation = setInterval(() => {
			this.goToSlide();
		}, 4000);
	}

	endAnimation() {
		clearInterval(this.animation);
	}

	goToSlide() {
		this.mainSlides[this.currentSlide].showing = false;
		this.knobs[this.currentSlide] = false;
		this.currentSlide = (this.currentSlide + 1 + this.mainSlides.length) % this.mainSlides.length;
		this.mainSlides[this.currentSlide].showing = true;
		this.knobs[this.currentSlide] = true;
	}

	goToPic(pic) {
		clearInterval(this.animation);
		for (let i=0; i<this.knobs.length; i++) {
			this.knobs[i] = false;
		}
		this.mainSlides.forEach(element => {
			element.showing = false;
		});
		this.mainSlides[pic].showing = true;
		this.knobs[pic] = true;
		this.currentSlide = pic;
		this.animation = setInterval(() => {
			this.goToSlide();
		}, 4000);
	}

}
