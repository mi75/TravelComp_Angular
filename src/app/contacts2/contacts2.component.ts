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

  // public contactForm: FormGroup = new FormGroup({
  //   message: new FormControl('',[
  //     Validators.required,
  //     Validators.maxLength(1000)
  //   ]),
  //   from: new FormControl('',[
  //     Validators.required,
  //     Validators.maxLength(80),
  //     Validators.pattern(/[0-9!?,.;:@\\#$\/)(%^&*]/g)
  //   ]),
  //   mail: new FormControl('',[
  //     Validators.required,
  //     Validators.email
  //   ]),
  //   phone: new FormControl('',[
  //     Validators.required,
  //     this.phoneValidator()
  //   ]),
  //   how: new FormControl('',[
  //     Validators.required
  //   ]),
  //   cb: new FormControl(true)
  // });
  public contactForm: FormGroup;
  // public message: AbstractControl;

  constructor(
    // private valid: ValidatorService,
    // private send: ApiCallerService,
    private _fb: FormBuilder
  ) {
    // this.contactForm = _fb.group({  
    //   'message':  ['', Validators.required]  
    // });
    // this.message = this.contactForm.controls['message'];

    // this.contactForm = fb.group({
    //   message: ['', [
    //     Validators.required,
    //     Validators.maxLength(1000)
    //   ]],
    //   from: ['', [
    //     Validators.required,
    //     Validators.maxLength(80),
    //     Validators.pattern(/[0-9!?,.;:@\\#$\/)(%^&*]/g)
    //   ]],
    //   mail: ['', [
    //     Validators.required,
    //     Validators.email
    //   ]],
    //   phone: ['', [
    //     Validators.required,
    //     this.phoneValidator()
    //   ]],
    //   how: ['', [
    //     Validators.required
    //   ]],
    //   cb: [true]
    // });

    this.contactForm = this._fb.group({
      message: this._fb.control('', [
        Validators.required,
        Validators.maxLength(1000)
      ]),
      from: this._fb.control('', [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern(/[0-9!?,.;:@\\#$\/)(%^&*]/g)
      ]),
      mail: this._fb.control('', [
        Validators.required,
        Validators.email
      ]),
      phone: this._fb.control('', [
        Validators.required,
        this.phoneValidator()
      ]),
      how: this._fb.control('', [
        Validators.required
      ]),
      cb: this._fb.control(true)
    });

   }

  ngOnInit() {
  }
  

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

  sendMySuggestion(data: FormGroup): void {
    
    console.log(data['message'], data['how'], data['cb']);
    // this.contactForm.get('message').setValue('HELLO');
    console.log(this.contactForm.errors);

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
