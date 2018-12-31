import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiCallerService {

  public static readonly webAdddr = 'http://127.0.0.1:3000/';

  constructor(
    private http: Http
  ) { }

  getData(addr) {
    return this.http.get(ApiCallerService.webAdddr + addr,  {  withCredentials: true  }).pipe(
      map( item => item.json() )
     );
  }

  postData(addr, data) {
    return this.http.post(ApiCallerService.webAdddr + addr, data, {  withCredentials: true  });
  }

}
