import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiGetCallerService {

  constructor(
    private http: Http
  ) { }

  getData(addr){
    return this.http.get(addr)
      .map( item => {
      return item.json();
    } )
  }

}
