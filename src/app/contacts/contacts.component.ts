import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidatorService } from '../_services/validator.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ValidatorService]
})
export class ContactsComponent implements OnInit {

  constructor(
    private valid: ValidatorService
  ) { }

  ngOnInit() {
  }

  toValidate(){
    
  }
}
