import { Injectable } from '@angular/core';
import {SLIDES} from '../SLIDES';

@Injectable()
export class SliderService {

  getSlides(){
		return SLIDES;
	}

}
