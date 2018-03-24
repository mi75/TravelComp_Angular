import { Injectable } from '@angular/core';

@Injectable()
export class MReviewsService {

  constructor() { }

  checkExist(arr, arrLen, ifEmpty){
    for (let i=0; i<arrLen; i++){
      if (!arr[i].photo) {
        arr[i].photo = ifEmpty;
      }
    }
  }
}
