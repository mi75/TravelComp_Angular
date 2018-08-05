import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { CommonValidatorService } from '../_services/common-validator.service';
import { ApiCallerService } from '../_services/api-caller.service';
import { FeedbackFormat } from "../feedback-format";

@Component({
  selector: 'new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css'],
  providers: [CommonValidatorService, ApiCallerService]
})
export class NewTourComponent implements OnInit {

  tripFeatures:object[];
  public tourForm: FormGroup;
  featuresArr = [];

  constructor(
    private valid: CommonValidatorService,
    private apiCall: ApiCallerService,
    private _fb: FormBuilder
  ) {
    this.tourForm = this._fb.group({
      program: this._fb.control('', [
        // valid.messageValidator()
      ]),
      characteristics: this._fb.control('', [
        // valid.messageValidator()
      ]),
      displ: this._fb.control(true),
      title: this._fb.control('', [
        // valid.userNameValidator()
      ]),
      startDate: this._fb.control('', [
        // valid.mailValidator()
      ]),
      finishDate: this._fb.control('', [
        // valid.phoneValidator()
      ]),
      price: this._fb.control('', [
        // valid.notEmptyValidator()
      ]),
      cb0: this._fb.control(true),
      cb1: this._fb.control(false),
      cb2: this._fb.control(false),
      cb3: this._fb.control(false),
      cb4: this._fb.control(false)
    });
   }

  ngOnInit() {
    this.apiCall.getData('api/trips/features').subscribe( res => {
      this.tripFeatures = res;
    });
  }

// @Output() sendingNewTour = new EventEmitter();

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

  sendNewTour(): void {

    let newTourData = new FormData();

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      newTourData.set('picture', fileToUpload);
    }

    Object.keys(this.tourForm.controls).forEach(field => {
      const control = this.tourForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.tourForm.valid) {

      Object.keys(this.tourForm.controls).forEach(field => {
        const control = this.tourForm.get(field);
        newTourData.set(field, control.value);
      });

      if (this.tourForm.controls.cb0.value) {this.featuresArr.push(1)};
      if (this.tourForm.controls.cb1.value) {this.featuresArr.push(2)};
      if (this.tourForm.controls.cb2.value) {this.featuresArr.push(3)};
      if (this.tourForm.controls.cb3.value) {this.featuresArr.push(4)};
      if (this.tourForm.controls.cb4.value) {this.featuresArr.push(5)};

      this.apiCall.postData('api/trips/create?featureIds=' + this.featuresArr.toString(), newTourData)
      .subscribe(
        success => {
          this.onSuccess();
        },
        error => {alert('Sending Error')}
      );
    }
  }

  onSuccess() {
    // this.sendingNewTour.emit(this.newFeedback);
    this.tourForm.reset({
      displ: true,
        program: '',
        characteristics: '',
        title: '',
        startDate: '',
        finishDate: '',
        price: '',
        cb0: true,
        cb1: false,
        cb2: false,
        cb3: false,
        cb4: false
    });

    this.imageBase64 = '';
    this.fileInput.nativeElement.value = '';
  }

}
