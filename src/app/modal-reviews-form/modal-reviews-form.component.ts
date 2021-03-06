import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { CommonValidatorService } from '../_services/common-validator.service';
import { ApiCallerService } from '../_services/api-caller.service';
import { FeedbackFormat } from "../feedback-format";

@Component({
  selector: 'modal-reviews-form',
  templateUrl: './modal-reviews-form.component.html',
  styleUrls: ['./modal-reviews-form.component.css']
})
export class ModalReviewsFormComponent implements OnInit {

  public feedbackForm: FormGroup;

  constructor(
    private valid: CommonValidatorService,
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

  public newFeedback:FeedbackFormat = new FeedbackFormat();


  imageBase64: any;
  imageUpload(e) {
    let reader = new FileReader();
    //get the selected file from event
    let file = e.target.files[0];
    reader.onloadend = () => {
      //Assign the result to variable for setting the src of image element
      this.imageBase64 = reader.result;
    };
    reader.readAsDataURL(file);
  }

  @ViewChild("fileInput") fileInput;

  sendMyReview(): void {

    let feedbackData = new FormData();

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      feedbackData.set('photo', fileToUpload);
    }

    Object.keys(this.feedbackForm.controls).forEach(field => {
      const control = this.feedbackForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.feedbackForm.valid) {

      this.newFeedback.name = this.feedbackForm.get('from').value;
      this.newFeedback.message = this.feedbackForm.get('message').value;
      this.newFeedback.base64Pic = this.imageBase64;
      this.newFeedback.date =  new Date();

      Object.keys(this.feedbackForm.controls).forEach(field => {
        const control = this.feedbackForm.get(field);
        feedbackData.set(field, control.value);
      });

      // .subscribe(function(errorMessage){alert(errorMessage);})
      // .subscribe(errorMessage => alert(errorMessage))

      this.send.postData('api/feedback', feedbackData)
      .subscribe(
        success => {
          // this.onSuccess(success.json().feedbackPhotoName);
          this.onSuccess();
        },
        error => {alert('Sending Error')}
      );
    }
  }

  onSuccess() {
    // if (feedbackPhotoName) {this.newFeedback.photo = feedbackPhotoName}
    this.sendingFeedback.emit(this.newFeedback);
    this.feedbackForm.reset({
      message: '',
      from: ''
    });

    this.imageBase64 = '';
    this.fileInput.nativeElement.value = '';

    this.hide();
  }


}
