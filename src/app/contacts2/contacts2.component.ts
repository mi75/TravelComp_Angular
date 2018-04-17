import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ValidatorService } from '../_services/validator.service';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'contacts2',
  templateUrl: './contacts2.component.html',
  styleUrls: ['./contacts2.component.css'],
  providers: [ValidatorService, ApiCallerService]
})
export class Contacts2Component implements OnInit {


  public contactForm: FormGroup;

  constructor(
    private valid: ValidatorService,
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
