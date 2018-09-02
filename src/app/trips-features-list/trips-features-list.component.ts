import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFeaturesFormat } from "../tripfeatures-format";

@Component({
  selector: 'trips-features-list',
  templateUrl: './trips-features-list.component.html',
  styleUrls: ['./trips-features-list.component.css'],
  providers: [ApiCallerService]
})
export class TripsFeaturesListComponent implements OnInit {

  features:tripFeaturesFormat[];

  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    this.reloadFeatures();
  }

  // delTrip(id, index) {
  //   confirm('Уверены, что хотите удалить поездку?');
  //   this.load.postData('api/trips/delete?rowId=' + id, null)
  //     .subscribe(
  //       success => {
  //         this.features.splice(index, 1);
  //       },
  //       error => {alert('Sending Error')}
  //     );
  // }

  reloadFeatures() {
    this.load.getData('api/trips/allfeatures').subscribe( res => {
      this.features = res;
    });
  }

}
