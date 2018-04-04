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

  // postData(addr, form: MySuggestion){
  //   const body = {name: form.name, phone: form.phone};
  //   return this.http.post(this.webAdddr+addr, body); 
  // }

  postData(addr, newMessage, newName, newEmail, newPhone, newHowHeard, newKeepMe){
    const data = {message: newMessage, from: newName, mail: newEmail, phone: newPhone, how: newHowHeard, cb: newKeepMe};
    return this.http.post(this.webAdddr+addr, data);
  }

}
