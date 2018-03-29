import { Component, OnInit } from '@angular/core';
import { ApiGetCallerService } from '../_services/api-get-caller.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ApiGetCallerService]
})
export class AdminComponent implements OnInit {

  contacts;
  constructor(
    private load: ApiGetCallerService
  ) { }

  ngOnInit() {
    this.load.getData('api/admin').subscribe( res => {
      this.contacts = res;
    } )
  }

}
