import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { CommonValidatorService } from '../_services/common-validator.service';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css'],
  providers: [CommonValidatorService, ApiCallerService]
})
export class NewTourComponent implements OnInit {

  public tourForm: FormGroup;

  constructor(
    private valid: CommonValidatorService,
    private send: ApiCallerService,
    private _fb: FormBuilder
  ) {
    this.tourForm = this._fb.group({
      program: this._fb.control('', [
        // valid.messageValidator()
      ]),
      title: this._fb.control('', [
        // valid.userNameValidator()
      ]),
      startDate: this._fb.control('', [
        // valid.mailValidator()
      ]),
      finishDate: this._fb.control('', [
        // valid.phoneValidator()
      ]),
      price: this._fb.control('', [
        // valid.notEmptyValidator()
      ]),
      cb1: this._fb.control(true),
      cb2: this._fb.control(false),
      cb3: this._fb.control(false),
      cb4: this._fb.control(false),
    });
   }

  ngOnInit() {
  }

}
