import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.css']
})
export class ValidatorMessageComponent implements OnInit {

  @Input() field: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get validatorMessages() {
    const field = this.field;
    if (!field || !field.errors) {
      return false;
    }
    const errors = [];
    const config = {
      required: 'Field is required',
      email: 'Should contain e-mail',
      pattern: 'Not match to pattren'
    };
    if (field.errors.hasOwnProperty('custom')) {
      config['custom'] = (typeof field.errors.custom === 'string' && field.errors.custom.length) ?
      field.errors.custom :
      'Does not match to format';
    }
    if (field.errors.hasOwnProperty('maxlength')) {
      config['maxlength'] = 'Max length ${field.errors.maxlength.requiredLength}';
    }
    Object.keys(field.errors).forEach((error: string) => {
      errors.push(config[error]);
    });
    return errors;
  }

}
