import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [ApiCallerService]
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private send: ApiCallerService
  ) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    this.send.postData('api/login', loginForm)
      .subscribe(
        error => alert(error)
      );
  }

}
