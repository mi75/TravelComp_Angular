import { Injectable } from '@angular/core';

@Injectable()
export class MReviewsService {

  constructor() { }

  checkPhoto(arr, arrLen){
    for (let i=0; i<arrLen; i++){
      if (!arr[i].photo) {
        arr[i].photo = 'default_customer.jpg';
      }
    }
  }
}
