import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GetAdminDataService {

  constructor(
    private http: Http
  ) { }

  getContacts(){
      return this.http.get('http://127.0.0.1:8080/api/admin')
        .map( item => {
        return item.json();
      } ) 
  }


}
