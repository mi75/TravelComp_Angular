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

  contactForm: FormGroup;
  message: AbstractControl;

  constructor(
    private valid: ValidatorService,
    private send: ApiCallerService,
    fb: FormBuilder
  ) {
    this.contactForm = fb.group({
      'message': [''],
      'from': [''],
      'mail': [''],
      'phone': [''],
      'how': [''],
      'cb': [true]
    });
    this.message = this.contactForm.controls['message'];
   }

  ngOnInit() {
  }
  
  resetError(elem) {
    elem.parentNode.className = 'f-row';
    if (elem.parentNode.lastChild.className == "error-message") {
        elem.parentNode.removeChild(elem.parentNode.lastChild);
    }
  }

  showError(elem, errorMessage) {
    elem.parentNode.className = 'f-row error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    elem.parentNode.appendChild(msgElem);
  }

  // toValidate(form: any): void {
  //   let er = null;

  //   this.resetError(form.message);
  //   if (!this.valid.validator.validate(form.message.value, this.valid.validator.rules.notEmpty)) {
  //       this.showError(form.message, ' Отсутствует текст.');
  //       er = 1;
  //   } else {
  //       if (!this.valid.validator.validate(form.message.value, this.valid.validator.rules.charsCount, 1000)) {
  //           this.showError(form.message, ' максимум 1000 символов.');
  //           er = 1;
  //       }
  //   }

  //   this.resetError(form.from);
  //   if (!this.valid.validator.validate(form.from.value, this.valid.validator.rules.notEmpty)) {
  //       this.showError(form.from, ' Укажите, от кого.');
  //       er = 1;
  //   } else {
  //       if (!this.valid.validator.validate(form.from.value, this.valid.validator.rules.clientName)) {
  //         this.resetError(form.from);
  //         this.showError(form.from, ' допустимы только буквы.');
  //           er = 1;
  //       }
  //   }
  //   if (!this.valid.validator.validate(form.from.value, this.valid.validator.rules.charsCount, 80)) {
  //     this.showError(form.from, ' максимум 80 символов.');
  //       er = 1;
  //   }

  //   this.resetError(form.mail);
  //   if (!form.mail.value) {
  //     this.showError(form.mail, ' Укажите адрес.');
  //       er = 1;
  //   } else {
  //       if (!this.valid.validator.validate(form.mail.value, this.valid.validator.rules.email)) {
  //         this.showError(form.mail, ' некорректный адрес');
  //           er = 1;
  //       }
  //   }

  //   this.resetError(form.phone);
  //   if (!this.valid.validator.validate(form.phone.value, this.valid.validator.rules.notEmpty)) {
  //     this.showError(form.phone, ' Укажите телефон.');
  //       er = 1;
  //   } else {
  //       if (!this.valid.validator.validate(form.phone.value, this.valid.validator.rules.phone)) {
  //         this.showError(form.phone, ' некорректный номер');
  //           er = 1;
  //       }
  //   }

  //   this.resetError(form.how);
  //   if (!form.how.value) {
  //       this.showError(form.how, ' Укажите источник.');
  //       er = 1;
  //   }

  //   if (!er) {
  //     this.sendMySuggestion(form.message, form.from, form.mail, form.phone, form.how, form.cb);
  //     form.message.value = '';
  //     form.from.value = '';
  //     form.mail.value = '';
  //     form.phone.value = '';
  //     form.how.value = '';
  //     form.cb.value = 'on';
  //   }
  // }

  // toValidate(form: any): void {  
  //   console.log(form);
  //   form.reset();
  // }

  toValidate(value: string): void {  
    console.log(value);
    this.contactForm.reset();
    
    // form.message.value = '';
      // form.from.value = '';
      // form.mail.value = '';
      // form.phone.value = '';
      // form.how.value = '';
  }

  sendMySuggestion(newMessage, newName, newEmail, newPhone, newHowHeard, newKeepMe) {
    // this.form.reset();
    // this.form.reset(this.form.value);
    // sendPost(uploadAddress, formData, function() { document.forms.mySuggestion.reset(); }, function(errorMessage) { alert(errorMessage) }); //from apiCaller.js
    const data = {message: newMessage, from: newName, mail: newEmail, phone: newPhone, how: newHowHeard, cb: newKeepMe};
    this.send.postData('api/contacts', data)
      .subscribe(
        error => alert(error)
      );
  }

}
