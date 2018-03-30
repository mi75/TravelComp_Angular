import { Injectable } from '@angular/core';
import {SLIDES} from '../SLIDES';
import {KNOBS} from '../KNOBS';
import { element } from 'protractor';

@Injectable()
export class SliderService {

	currentSlide=0;
	animation;

  	getSlides(){
		return SLIDES;
	}
	getKnobs(){
		return KNOBS;
	}
	

	startAnimation(){
		this.animation = setInterval(() =>{
			this.goToSlide(this.currentSlide)
		}, 4000);
	}

	goToSlide(currentSlide) {
		SLIDES[this.currentSlide].showing = false;
		KNOBS[this.currentSlide].clicked = false;
		this.currentSlide = (this.currentSlide + 1 + SLIDES.length) % SLIDES.length;
		SLIDES[this.currentSlide].showing = true;
		KNOBS[this.currentSlide].clicked = true;
	}

	goToPic(pic) {
		clearInterval(this.animation);
		KNOBS.forEach(element => {
			element.clicked = false;
		});
		SLIDES.forEach(element => {
			element.showing = false;
		});
		SLIDES[pic].showing = true;
		KNOBS[pic].clicked = true;
		this.animation = setInterval(() =>{
			this.goToSlide(this.currentSlide);
		}, 4000);
	}

}
