import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
      ])
    });
   }

  ngOnInit() {
  }

  @Output() sendingFeedback = new EventEmitter();

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
    document.body.className += ' modal-open';
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
    document.body.className = document.body.className.replace('modal-open', '');
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  imageUrl: any;
  imageUpload(e) {
    let reader = new FileReader();
    //get the selected file from event
    let file = e.target.files[0];
    reader.onloadend = () => {
      //Assign the result to variable for setting the src of image element
      this.imageUrl = reader.result;
    }
    reader.readAsDataURL(file);
  }

  @ViewChild("fileInput") fileInput;

  sendMyReview(): void {

    let feedbackData = new FormData();

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      feedbackData.append("photo", fileToUpload);
    }

    Object.keys(this.feedbackForm.controls).forEach(field => { 
      const control = this.feedbackForm.get(field); 
      control.markAsTouched({ onlySelf: true });
    });

    if (this.feedbackForm.valid) {

      Object.keys(this.feedbackForm.controls).forEach(field => { 
        const control = this.feedbackForm.get(field); 
        feedbackData.append(field, control.value);
      });

      this.send.postData('api/feedback', feedbackData)
      .subscribe(
        error => alert(error)
      );

      this.sendingFeedback.emit(this.feedbackForm);

      this.feedbackForm.reset({
        message: '',
        from: '',
        photo: null
      });

      this.hide();
    }
  }


}
