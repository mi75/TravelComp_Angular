import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [ApiCallerService]
})
export class AdminPageComponent implements OnInit {

  contacts:any[];

  constructor(
    private toServer: ApiCallerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.toServer.getData('api/admin/adminStart')
    .subscribe(
      res => this.contacts = res,
      error => error.status=='401' ? this.router.navigate(['login']) : alert(error)
    );
  }

  toLogout() {
    if (confirm('Выйти из режима администрирования?')) {
      this.toServer.postData('api/logout', null)
      .subscribe(
        success => this.router.navigate(['login']),
        error => alert('Connection Error')
      );
    }
  }

}
