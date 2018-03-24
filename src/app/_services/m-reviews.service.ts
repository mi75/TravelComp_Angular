import { Injectable } from '@angular/core';

@Injectable()
export class MReviewsService {

  constructor() { }

  checkExist(arr, ifEmpty){
    for (let i=0; i<arr.length; i++){
      if (!arr[i].photo) {
        arr[i].photo = ifEmpty;
      }
    }
  }
}
