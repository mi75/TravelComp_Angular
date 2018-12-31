import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl  } from '@angular/forms';
import { CommonValidatorService } from '../_services/common-validator.service';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFeaturesFormat } from "../tripfeatures-format";
import { Router } from '@angular/router';

@Component({
  selector: 'modal-feature-form',
  templateUrl: './modal-feature-form.component.html',
  styleUrls: ['./modal-feature-form.component.css'],
  providers: [CommonValidatorService, ApiCallerService]
})
export class ModalFeatureFormComponent implements OnInit {

  tripFeatures:tripFeaturesFormat[];
  public toursFeatureForm: FormGroup;

  constructor(
    private valid: CommonValidatorService,
    private apiCall: ApiCallerService,
    private router: Router,
    private _fb: FormBuilder
  ) {
    this.toursFeatureForm = this._fb.group({
      featureName: this._fb.control('', [
        valid.titleValidator()
      ])
    }); 
   }

  ngOnInit() {
  }

  @Output() sendingFeature = new EventEmitter();

  public visible = false;
  public visibleAnimate = false;
  private editionFeatureId;

  public show(featureForEdit : tripFeaturesFormat): void {
  
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
    document.body.className += ' modal-open';

    this.editionFeatureId = featureForEdit.id;

    this.toursFeatureForm.controls['featureName'].setValue(featureForEdit.description);
    
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

  sendThisFeature(): void {

    let newFeatureData = new FormData();
    newFeatureData.set('id', this.editionFeatureId);

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      newFeatureData.set('picture', fileToUpload);
    }

    Object.keys(this.toursFeatureForm.controls).forEach(field => {
      const control = this.toursFeatureForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.toursFeatureForm.valid) {

      Object.keys(this.toursFeatureForm.controls).forEach(field => {
        const control = this.toursFeatureForm.get(field);
        newFeatureData.set(field, control.value);
      });

      this.apiCall.postData('api/admin/editTripsFeature', newFeatureData)
          .subscribe(
            success => this.onSuccess(),
            error => error.status=='401' ? this.router.navigate(['login']) : alert('Sending Error') 
          );
    }
  }

  onSuccess() {
    this.sendingFeature.emit();

    this.toursFeatureForm.reset({
      featureName: ''
    });

    this.imageBase64 = '';
    this.fileInput.nativeElement.value = '';

    this.hide();
  }

}
