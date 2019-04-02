import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [ApiCallerService]
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private send: ApiCallerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  errorMessage:boolean = false;

  onSubmit(loginForm: NgForm) {
    this.send.postData('api/login', loginForm)
      .subscribe(
        data => this.router.navigate(['admin']),
        error => error.status=='401' ? this.errorMessage=true : alert(error)
      );
  }

}
