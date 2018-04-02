import { Injectable } from '@angular/core';
import {SLIDES} from '../SLIDES';
import { element } from 'protractor';

@Injectable()
export class SliderService {

	currentSlide=0;
	animation;
	// knobs: boolean[];
	knobs=[];

  	getSlides(){
		return SLIDES;
	}

	getKnobs(){
		for (let i=0; i<SLIDES.length; i++){
			this.knobs.push(false);
		}
		this.knobs[0] = true;
		return this.knobs;
	}

	startAnimation(){
		this.animation = setInterval(() =>{
			this.goToSlide()
		}, 4000);
	}

	endAnimation(){
		clearInterval(this.animation);
	}

	goToSlide() {
		SLIDES[this.currentSlide].showing = false;
		this.knobs[this.currentSlide] = false;
		this.currentSlide = (this.currentSlide + 1 + SLIDES.length) % SLIDES.length;
		SLIDES[this.currentSlide].showing = true;
		this.knobs[this.currentSlide] = true;
	}

	goToPic(pic) {
		clearInterval(this.animation);
		for (let i=0; i<this.knobs.length; i++){
			this.knobs[i] = false;
		}
		SLIDES.forEach(element => {
			element.showing = false;
		});
		SLIDES[pic].showing = true;
		this.knobs[pic] = true;
		this.currentSlide = pic;
		this.animation = setInterval(() =>{
			this.goToSlide();
		}, 4000);
	}

}
