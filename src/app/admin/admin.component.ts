import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ApiCallerService]
})
export class AdminComponent implements OnInit {

  contacts:object;
  
  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    this.load.getData('api/admin').subscribe( res => {
      this.contacts = res;
    } )
  }

}
