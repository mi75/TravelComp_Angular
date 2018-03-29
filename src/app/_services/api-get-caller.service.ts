import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiGetCallerService {

  webAdddr:string = 'http://127.0.0.1:8080/';

  constructor(
    private http: Http
  ) { }

  getData(addr){
    return this.http.get(this.webAdddr+addr)
      .map( item => {
      return item.json();
    } )
  }

}
