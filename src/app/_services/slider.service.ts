import { Injectable } from '@angular/core';
import {SLIDES} from '../SLIDES';
import { element } from 'protractor';

@Injectable()
export class SliderService {

	currentSlide=0;

  	getSlides(){
		return SLIDES;
	}


	startAnimation(){
		setInterval(() =>{
			this.goToSlide(this.currentSlide)
		}, 4000);
	}

	goToSlide(currentSlide) {
		SLIDES[this.currentSlide].showing = false;
		this.currentSlide = (this.currentSlide + 1 + SLIDES.length) % SLIDES.length;
		SLIDES[this.currentSlide].showing = true;
	}


}
