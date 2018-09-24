import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { CommonValidatorService } from '../_services/common-validator.service';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css'],
  providers: [CommonValidatorService, ApiCallerService]
})
export class ContactsPageComponent implements OnInit {

  public contactForm: FormGroup;

  constructor(
    private valid: CommonValidatorService,
    private send: ApiCallerService,
    private _fb: FormBuilder
  ) {
    this.contactForm = this._fb.group({
      message: this._fb.control('', [
        valid.messageValidator()
      ]),
      from: this._fb.control('', [
        valid.userNameValidator()
      ]),
      mail: this._fb.control('', [
        valid.mailValidator()
      ]),
      phone: this._fb.control('', [
        valid.phoneValidator()
      ]),
      how: this._fb.control('', [
        valid.notEmptyValidator()
      ]),
      cb: this._fb.control(true)
    });
   }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  sendMySuggestion(data: FormGroup): void {

    Object.keys(this.contactForm.controls).forEach(field => {
      const control = this.contactForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.contactForm.valid) {
      this.send.postData('api/contacts', data)
      .subscribe(
        error => alert(error)
      );
      this.contactForm.reset({
        message: '',
        from: '',
        mail: '',
        phone: '',
        how: '',
        cb: true
      });
    }
  }

}
