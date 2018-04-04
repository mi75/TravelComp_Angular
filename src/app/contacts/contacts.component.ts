import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { ValidatorService } from '../_services/validator.service';
import { ApiGetCallerService } from '../_services/api-get-caller.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ValidatorService, ApiGetCallerService]
})
export class ContactsComponent implements OnInit {

  constructor(
    private valid: ValidatorService,
    private send: ApiGetCallerService
  ) { }

  ngOnInit() {
  }

  // form: FormGroup;

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

  toValidate(newMessage, newName, newEmail, newPhone, newHowHeard, newKeepMe){
    let er = null;

    this.resetError(newMessage);
    if (!this.valid.validator.validate(newMessage.value, this.valid.validator.rules.notEmpty)) {
        this.showError(newMessage, ' Отсутствует текст.');
        er = 1;
    } else {
        if (!this.valid.validator.validate(newMessage.value, this.valid.validator.rules.charsCount, 1000)) {
            this.showError(newMessage, ' максимум 1000 символов.');
            er = 1;
        }
    }

    this.resetError(newName);
    if (!this.valid.validator.validate(newName.value, this.valid.validator.rules.notEmpty)) {
        this.showError(newName, ' Укажите, от кого.');
        er = 1;
    } else {
        if (!this.valid.validator.validate(newName.value, this.valid.validator.rules.clientName)) {
          this.resetError(newName);
          this.showError(newName, ' допустимы только буквы.');
            er = 1;
        }
    }
    if (!this.valid.validator.validate(newName.value, this.valid.validator.rules.charsCount, 80)) {
      this.showError(newName, ' максимум 80 символов.');
        er = 1;
    }

    this.resetError(newEmail);
    if (!newEmail.value) {
      this.showError(newEmail, ' Укажите адрес.');
        er = 1;
    } else {
        if (!this.valid.validator.validate(newEmail.value, this.valid.validator.rules.email)) {
          this.showError(newEmail, ' некорректный адрес');
            er = 1;
        }
    }

    this.resetError(newPhone);
    if (!this.valid.validator.validate(newPhone.value, this.valid.validator.rules.notEmpty)) {
      this.showError(newPhone, ' Укажите телефон.');
        er = 1;
    } else {
        if (!this.valid.validator.validate(newPhone.value, this.valid.validator.rules.phone)) {
          this.showError(newPhone, ' некорректный номер');
            er = 1;
        }
    }

    this.resetError(newHowHeard);
    if (!newHowHeard.value) {
        this.showError(newHowHeard, ' Укажите источник.');
        er = 1;
    }

    if (!er) {
      this.sendMySuggestion(newMessage, newName, newEmail, newPhone, newHowHeard, newKeepMe);
      newMessage.value = '';
      newName.value = '';
      newEmail.value = '';
      newPhone.value = '';
      newHowHeard.value = '';
      newKeepMe.value = 'on';
    }
  }

  sendMySuggestion(newMessage, newName, newEmail, newPhone, newHowHeard, newKeepMe) {
    // this.form.reset();
    // this.form.reset(this.form.value);
    // sendPost(uploadAddress, formData, function() { document.forms.mySuggestion.reset(); }, function(errorMessage) { alert(errorMessage) }); //from apiCaller.js
  this.send.postData('api/contacts', newMessage, newName, newEmail, newPhone, newHowHeard, newKeepMe)
    .subscribe(
      error => alert(error)
    );
  }
}
