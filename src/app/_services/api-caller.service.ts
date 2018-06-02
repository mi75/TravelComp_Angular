
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';


@Injectable()
export class ApiCallerService {

  webAdddr:string = 'http://127.0.0.1:8080/';

  constructor(
    private http: Http
  ) { }

  getData(addr){
    return this.http.get(this.webAdddr+addr).pipe(
      map( item => {
      return item.json();
    } ))
  }

  postData(addr, data){
    return this.http.post(this.webAdddr+addr, data);
  }


}
