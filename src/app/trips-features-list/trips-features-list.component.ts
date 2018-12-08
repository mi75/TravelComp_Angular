import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFeaturesFormat } from "../tripfeatures-format";
import { Router } from '@angular/router';

@Component({
  selector: 'trips-features-list',
  templateUrl: './trips-features-list.component.html',
  styleUrls: ['./trips-features-list.component.css'],
  providers: [ApiCallerService]
})
export class TripsFeaturesListComponent implements OnInit {

  features:tripFeaturesFormat[];
  getImgPath:string = ApiCallerService.webAdddr + 'api/images?useBodyPath=true&id=';

  constructor(
    private load: ApiCallerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reloadFeatures();
  }

  delFeature(id, index) {
    if (confirm('Уверены, что хотите удалить опцию?')) {
      this.load.postData('api/admin/delTripsFeature',  {"id": id})
      .subscribe(
        success => this.features.splice(index, 1),
        error => error.status=='401' ? this.router.navigate(['login']) : alert('Sending Error')
      );
    }
  }

  reloadFeatures() {
    this.load.getData('api/admin/tripsFeatures')
    .subscribe(
      res => this.features = res,
      error => error.status=='401' ? this.router.navigate(['login']) : alert(error)
    );
  }

}
