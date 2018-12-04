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
    private load: ApiCallerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.load.getData('api/admin')
    .subscribe(
      res => this.contacts = res,
      error => error.status=='401' ? this.router.navigate(['login']) : alert(error)
    );
  }

  delSession() {
    if (confirm('Уверены, что хотите logout?')) {
      this.load.getData('api/logout');
      this.router.navigate(['login']);
    }
  }

}
