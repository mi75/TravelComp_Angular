import { Component, OnInit } from '@angular/core';
import { GetAdminDataService } from '../_services/get-admin-data.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [GetAdminDataService]
})
export class AdminComponent implements OnInit {

  contacts;
  constructor(
    private us: GetAdminDataService
  ) { }

  ngOnInit() {
    this.us.getContacts().subscribe( res => {
      this.contacts = res;
    } )
  }

}
