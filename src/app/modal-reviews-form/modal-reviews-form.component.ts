import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ValidatorService } from '../_services/validator.service';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'modal-reviews-form',
  templateUrl: './modal-reviews-form.component.html',
  styleUrls: ['./modal-reviews-form.component.css'],
  providers: [ValidatorService, ApiCallerService]
})
export class ModalReviewsFormComponent implements OnInit {

  public feedbackForm: FormGroup;

  constructor(
    private valid: ValidatorService,
    private send: ApiCallerService,
    private _fb: FormBuilder
  ) {
    this.feedbackForm = this._fb.group({
      message: this._fb.control('', [
        valid.messageValidator()
      ]),
      from: this._fb.control('', [
        valid.userNameValidator()
      ]),
      photo: this._fb.control('')
    });
   }

  ngOnInit() {
  }

  public visible = false;
  public visibleAnimate = false;
  // public ff: string = '';

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  sendMyReview(data: FormGroup): void {

    Object.keys(this.feedbackForm.controls).forEach(field => { 
      const control = this.feedbackForm.get(field); 
      control.markAsTouched({ onlySelf: true });
    });

    if (this.feedbackForm.valid) {
      this.send.postData('api/feedback', data)
      .subscribe(
        error => alert(error)
      );
      this.feedbackForm.reset({
        message: '',
        from: '',
        photo: ''
      });
    }
  }

}
