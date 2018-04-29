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
      ]),
      photo: ''
      // photo: null
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

  @ViewChild("fileInput") fileInput;

  sendMyReview(data: FormGroup): void {

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      // this.send
      //   .upload(fileToUpload)
      //   .subscribe(res => {
      //       console.log(res);
      //   });
      console.log(fileToUpload);

    }

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
        photo: null
      });
      // console.log(this.feedbackForm.controls.photo.value);
      this.visibleAnimate = false;
      setTimeout(() => this.visible = false, 300);
    }
  }

  // imageUrl: any;
  // imageUpload(e) {
  //   let reader = new FileReader();
  //   //get the selected file from event
  //   let file = e.target.files[0];
  //   reader.onloadend = () => {
  //     //Assign the result to variable for setting the src of image element
  //     this.imageUrl = reader.result;
  //     console.log(this.imageUrl);
  //   }
  //   reader.readAsDataURL(file);
  // }

}
