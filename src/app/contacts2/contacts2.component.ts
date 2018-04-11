import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// import { ValidatorService } from '../_services/validator.service';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'contacts2',
  templateUrl: './contacts2.component.html',
  styleUrls: ['./contacts2.component.css']
  // providers: [ValidatorService, ApiCallerService]
})
export class Contacts2Component implements OnInit {

  public contactForm: FormGroup = new FormGroup({
    message: new FormControl('',[
      Validators.required,
      Validators.maxLength(1000)
    ]),
    from: new FormControl('',[
      Validators.required,
      Validators.maxLength(80),
      Validators.pattern(/[0-9!?,.;:@\\#$\/)(%^&*]/g)
    ]),
    mail: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('',[
      Validators.required,
      this.phoneValidator()
    ]),
    how: new FormControl('',[
      Validators.required
    ]),
    cb: new FormControl(true)
  });

  constructor(
    // private valid: ValidatorService,
    // private send: ApiCallerService,
    private fb: FormBuilder
  ) {
    // this.contactForm = fb.group({
    //   message: [''],
    //   from: [''],
    //   mail: [''],
    //   phone: [''],
    //   how: [''],
    //   cb: [true]
    // });
   }

  ngOnInit() {
  }
  
  // resetError(elem) {
  //   elem.parentNode.className = 'f-row';
  //   if (elem.parentNode.lastChild.className == "error-message") {
  //       elem.parentNode.removeChild(elem.parentNode.lastChild);
  //   }
  // }

  // showError(elem, errorMessage) {
  //   elem.parentNode.className = 'f-row error';
  //   var msgElem = document.createElement('span');
  //   msgElem.className = "error-message";
  //   msgElem.innerHTML = errorMessage;
  //   elem.parentNode.appendChild(msgElem);
  // }

  private userNameValidator(): ValidatorFn {
    const pattern: RegExp = /^[\w\.\$@\*\!]{5,30}$/;
    return (control: AbstractControl): {[key: string]: any}=>{
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: 'Min len:5, cant cont symbs'};
      }
    };
  }
  private phoneValidator(): ValidatorFn {
    const pattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return (control: AbstractControl): {[key: string]: any}=>{
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: 'Invalid phone namber'};
      }
    };
  }

  toValidate(data: FormGroup): void {
    
    console.log(data['message'], data['how'], data['cb']);
    // this.contactForm.get('message').setValue('HELLO');

    this.contactForm.reset({
      message: '',
      from: '',
      mail: '',
      phone: '',
      how: '',
      cb: true
    });

  }

  // sendMySuggestion(newMessage, newName, newEmail, newPhone, newHowHeard, newKeepMe) {
  //   const data = {message: newMessage, from: newName, mail: newEmail, phone: newPhone, how: newHowHeard, cb: newKeepMe};
  //   this.send.postData('api/contacts', data)
  //     .subscribe(
  //       error => alert(error)
  //     );
  // }

}
