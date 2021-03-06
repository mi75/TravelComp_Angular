import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, FormArray  } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonValidatorService } from '../_services/common-validator.service';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFeaturesFormat } from "../tripfeatures-format";

@Component({
  selector: 'new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css'],
  providers: [CommonValidatorService, ApiCallerService]
})
export class NewTourComponent implements OnInit {

  tripFeatures:tripFeaturesFormat[];
  public tourForm: FormGroup;
  
  constructor(
    private valid: CommonValidatorService,
    private apiCall: ApiCallerService,
    private _fb: FormBuilder,
    private router: Router
  ) {

    this.apiCall.getData('api/admin/tripsFeatures').subscribe( res => {
      this.tripFeatures = res;
      this.tourForm.controls['featureCheckboxes'] = this._fb.array(this.createFeatureCheckboxes());
    });

    this.tourForm = this._fb.group({
      onCommon: this._fb.control(false),
      onSlider: this._fb.control(false),
      onPopular: this._fb.control(false),
      program: this._fb.control('', [
        valid.messageValidator()
      ]),
      characteristics: this._fb.control('', [
        valid.messageValidator()
      ]),
      notInclude: this._fb.control('', [
        valid.messageValidator()
      ]),
      title: this._fb.control('', [
        valid.titleValidator()
      ]),
      fullTripName: this._fb.control('', [
        valid.messageValidator()
      ]),
      startDate: this._fb.control('', [
        valid.notEmptyValidator()
      ]),
      finishDate: this._fb.control('', [
        valid.notEmptyValidator()
      ]),
      price: this._fb.control('', [
        valid.notEmptyValidator()
      ]),
      featureCheckboxes: []
    }); 

   }

  ngOnInit() {
  }

  createFeatureCheckboxes(): FormControl[] {
    var features = this.tripFeatures.map(c => new FormControl(false));
    features[0].setValue(true);
    return features;
  }

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

  uncheckAll(e) {
    if (!e.target.checked) {
      this.tourForm.controls['onSlider'].setValue(false);
      this.tourForm.controls['onPopular'].setValue(false);
    }
  }

  setOnCommon(e) {
    if (e.target.checked) {
      this.tourForm.controls['onCommon'].setValue(true);
    }
  }

  @ViewChild("fileInput") fileInput;

  sendNewTour(data: FormGroup): void {

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

    if (this.tourForm.valid || (!this.tourForm.controls.onCommon.value)) {

      Object.keys(this.tourForm.controls).forEach(field => {
        const control = this.tourForm.get(field);
        newTourData.set(field, control.value);
      });

      var featuresArr = [];

      var checkboxes = (this.tourForm.controls.featureCheckboxes as FormArray).controls;
      for (let i = 0; i < this.tripFeatures.length; i++) {
         if (checkboxes[i].value){
          featuresArr.push(this.tripFeatures[i].id);
         }
      };
      newTourData.set('featureIds', featuresArr.toString());

      if (!newTourData.get('featureIds')) {
        alert('Обязательно отметьте, что включено!');
      } else { 
        if (!newTourData.get('picture') && (this.tourForm.controls.onCommon.value)) {
          alert('Для публиикации на сайте необходима картинка!');
        } else { 
          this.apiCall.postData('api/admin/createTrip', newTourData)
          .subscribe(
            success => this.onSuccess(),
            error => error.status=='401' ? this.router.navigate(['login']) : alert('Sending Error')
          );
        }
      }
    } 
  }

  onSuccess() {

    this.tourForm.reset({
      onCommon: false,
      program: '',
      characteristics: '',
      notInclude: '',
      title: '',
      fullTripName: '',
      startDate: '',
      finishDate: '',
      price: ''
    });

    
    var checkboxes =  (this.tourForm.controls.featureCheckboxes as FormArray).controls;
    checkboxes.forEach(checkbox => {
      checkbox.setValue(false);
    });
    checkboxes[0].setValue(true);

    this.imageBase64 = '';
    this.fileInput.nativeElement.value = '';
    this.router.navigate(['./alltours']);
  }

}
