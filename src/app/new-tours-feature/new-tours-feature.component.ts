import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonValidatorService } from '../_services/common-validator.service';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFeaturesFormat } from "../tripfeatures-format";

@Component({
  selector: 'new-tours-feature',
  templateUrl: './new-tours-feature.component.html',
  styleUrls: ['./new-tours-feature.component.css'],
  providers: [CommonValidatorService, ApiCallerService]
})
export class NewToursFeatureComponent implements OnInit {

  tripFeatures:tripFeaturesFormat[];
  public toursFeatureForm: FormGroup;

  constructor(
    private valid: CommonValidatorService,
    private apiCall: ApiCallerService,
    private _fb: FormBuilder,
    private router: Router
  ) {
    this.toursFeatureForm = this._fb.group({
      featureName: this._fb.control('', [
        valid.titleValidator()
      ])
    }); 
   }

  ngOnInit() {
  }

  imageBase64: any;
  imageUpload(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.imageBase64 = reader.result;
    };
    reader.readAsDataURL(file);
  }

  @ViewChild("fileInput") fileInput;

  sendNewFeature(): void {

    let newFeatureData = new FormData();

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

      if (!newFeatureData.get('picture')) {
          alert('Для публикации на сайте необходима картинка!');
        } else { 
          this.apiCall.postData('api/admin/createTripsFeature', newFeatureData)
          .subscribe(
            success => this.onSuccess(),
            error => error.status=='401' ? this.router.navigate(['login']) : alert('Sending Error') 
          );
        }
    }
  }

  onSuccess() {
    this.toursFeatureForm.reset({
      featureName: ''
    });

    this.imageBase64 = '';
    this.fileInput.nativeElement.value = '';
    this.router.navigate(['./featureslist']);
  }

}
