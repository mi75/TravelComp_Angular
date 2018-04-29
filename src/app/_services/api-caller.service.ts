import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiCallerService {

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

  postData(addr, data){
    return this.http.post(this.webAdddr+addr, data);
  }

  // upload(fileToUpload: any) {
  //   let input = new FormData();
  //   input.append("file", fileToUpload);

  //   return this.http.post("/api/uploadFile", input);
  // }

}
