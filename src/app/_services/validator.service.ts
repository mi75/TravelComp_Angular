import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

  constructor() { }

  validator:object = {
    rules: {
      notEmpty: 0,
      clientName: 1,
      email: 2,
      phone : 3,
      charsCount: 4,
    },
    validate: function(stringToValidate, rule, additionalParameter?){
      if (rule == this.rules.notEmpty){
        return this.validateNotEmpty(stringToValidate);
      }
      if (rule == this.rules.clientName){
        return this.validateName(stringToValidate);
      }
      if (rule == this.rules.email){
        return this.validateEmail(stringToValidate);
      }
      if (rule == this.rules.phone){
        return this.validatePhone(stringToValidate);
      }
      if (rule == this.rules.charsCount){
        return this.validateCharsCount(stringToValidate, additionalParameter);
      }
    },
  
    validateNotEmpty: function(stringToValidate){
      if (!stringToValidate.replace(/\s+/g, '')) {
            return false;
          }
          return true;
    },
  
    validateName: function(stringToValidate){
      if (stringToValidate.match(/[0-9!?,.;:@\\#$\/)(%^&*]/g)) {
            return false;
          }
          return true;
    },
    
    validateEmail: function(stringToValidate){
      var adressArray = stringToValidate.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return (adressArray != null && adressArray.length > 0);
    },
  
    validatePhone: function(stringToValidate){
      var simb = stringToValidate.replace(/[0-9)( +-]/g, '');
          var d = stringToValidate.match(/[0-9]/g);
          if (simb || (d.length!==12 && d.length!==10) || (d[0]!=='0' && String(d.slice(0,3)) !== '3,8,0')) {
            return false;
          }
          return true;
    },
  
    validateCharsCount: function(stringToValidate, numberOfChars){
      var contentWithoutSpaces = stringToValidate.replace(/\s+/g, '');
      var nettoLength = contentWithoutSpaces.length;
      return(nettoLength <= numberOfChars);
    }
    
  }

}
