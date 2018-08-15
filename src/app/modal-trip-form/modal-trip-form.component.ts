import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, FormArray  } from '@angular/forms';
import { CommonValidatorService } from '../_services/common-validator.service';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFeaturesFormat } from "../tripfeatures-format";
import { tripFormat } from "../trip-format";

@Component({
  selector: 'modal-trip-form',
  templateUrl: './modal-trip-form.component.html',
  styleUrls: ['./modal-trip-form.component.css'],
  providers: [CommonValidatorService, ApiCallerService]
})
export class ModalTripFormComponent implements OnInit {

  tripFeatures:tripFeaturesFormat[];
  public tourForm: FormGroup;

  constructor(
    private valid: CommonValidatorService,
    private apiCall: ApiCallerService,
    private _fb: FormBuilder
  ) {
    this.apiCall.getData('api/trips/features').subscribe( res => {
      this.tripFeatures = res;
      this.tourForm.controls['featureCheckboxes'] = this._fb.array(this.createFeatureCheckboxes());
    });

    this.tourForm = this._fb.group({
      program: this._fb.control('', [
        valid.messageValidator()
      ]),
      characteristics: this._fb.control('', [
        valid.messageValidator()
      ]),
      displ: this._fb.control(true),
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

  @Output() sendingTrip = new EventEmitter();
  
  public visible = false;
  public visibleAnimate = false;

  public show(id, index): void {
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

  @ViewChild("fileInput") fileInput;

  public thisTour:tripFormat = new tripFormat();

  sendThisTour(): void {

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

    if (this.tourForm.valid || (!this.tourForm.controls.displ.value)) {

      this.thisTour.title = this.tourForm.get('title').value;
      this.thisTour.fullTripName = this.tourForm.get('fullTripName').value;

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
        // this.apiCall.postData('api/trips/edit?rowId=' + id, newTourData)
        // .subscribe(
        //   success => {
        //     this.onSuccess();
        //   }, 
        //   error => {alert('Sending Error')}
        // );
        this.onSuccess();
      }
    }
  }

  onSuccess() {
    this.sendingTrip.emit(this.thisTour);

    this.tourForm.reset({
      displ: true,
      program: '',
      characteristics: '',
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
  }


}
