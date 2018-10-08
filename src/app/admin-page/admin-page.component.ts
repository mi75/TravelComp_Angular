import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [ApiCallerService]
})
export class AdminPageComponent implements OnInit {

  contacts:any[];

  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    this.load.getData('api/admin').subscribe( res => {
      this.contacts = res;
      for (let i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].keepMe == 1) {
          this.contacts[i].keepMe = 'да';
        } else {
          this.contacts[i].keepMe = 'нет';
        }
      }
    });
  }

}
