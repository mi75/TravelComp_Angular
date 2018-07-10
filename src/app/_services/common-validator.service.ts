import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonValidatorService {

  constructor() { }

  validator: any = {
    rules: {
      notEmpty: 0,
      clientName: 1,
      email: 2,
      phone : 3,
      charsCount: 4,
    },
    validate: function(stringToValidate: string, rule, additionalParameter?) {
      if (rule === this.rules.notEmpty) {
        return this.validateNotEmpty(stringToValidate);
      }
      if (rule === this.rules.clientName) {
        return this.validateName(stringToValidate);
      }
      if (rule === this.rules.email) {
        return this.validateEmail(stringToValidate);
      }
      if (rule === this.rules.phone) {
        return this.validatePhone(stringToValidate);
      }
      if (rule === this.rules.charsCount) {
        return this.validateCharsCount(stringToValidate, additionalParameter);
      }
    },

    validateNotEmpty: function(stringToValidate) {
      if (!stringToValidate.replace(/\s+/g, '')) {
            return false;
          }
          return true;
    },

    validateName: function(stringToValidate) {
      if (stringToValidate.match(/[0-9!?,.;:@\\#$\/)(%^&*]/g)) {
            return false;
          }
          return true;
    },

    validateEmail: function(stringToValidate) {
      let adressArray = stringToValidate.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return (adressArray != null && adressArray.length > 0);
    },

    validatePhone: function(stringToValidate) {
      let simb = stringToValidate.replace(/[0-9)( +-]/g, '');
      let dig = stringToValidate.match(/[0-9]/g);
      if (simb || (!dig) || !((dig[0] === '0' && dig.length === 10) || (String(dig.slice(0, 3)) === '3,8,0' && dig.length === 12))) {
        return false;
      }
      return true;
    },

    validateCharsCount: function(stringToValidate, numberOfChars) {
      let contentWithoutSpaces = stringToValidate.replace(/\s+/g, '');
      let nettoLength = contentWithoutSpaces.length;
      return(nettoLength <= numberOfChars);
    }

  };

  public messageValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!this.validator.validate(control.value, this.validator.rules.notEmpty)) {
          return {custom: 'oтсутствует текст'};
        } else {
              return (this.validator.validate(control.value, this.validator.rules.charsCount, 1000)) ? null : {custom: 'максимум 1000 символов'};
          }
    };
  }

  public userNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if (!this.validator.validate(control.value, this.validator.rules.notEmpty)) {
          return {custom: 'yкажите, от кого'};
        } else {
          if (!this.validator.validate(control.value, this.validator.rules.clientName)) {
            return {custom: 'допустимы только буквы'};
          } else {
              return (this.validator.validate(control.value, this.validator.rules.charsCount, 80)) ? null : {custom: 'максимум 80 символов'};
          }
        }
    };
  }

  public mailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if (!control.value) {
          return {custom: 'yкажите адрес'};
        } else {
        return (this.validator.validate(control.value, this.validator.rules.email)) ? null : {custom: 'некорректный адрес'};
        }
    };
  }

  public phoneValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if (!this.validator.validate(control.value, this.validator.rules.notEmpty)) {
          return {custom: 'yкажите телефон'};
        } else {
              return (this.validator.validate(control.value, this.validator.rules.phone)) ? null : {custom: 'некорректный номер'};
          }
    };
  }

  public notEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        return (control.value) ? null : {custom: 'yкажите источник'};
    };
  }

}
