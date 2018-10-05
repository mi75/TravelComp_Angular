import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFormat } from "../trip-format";

@Component({
  selector: 'admin-tours',
  templateUrl: './admin-tours.component.html',
  styleUrls: ['./admin-tours.component.css'],
  providers: [ApiCallerService]
})
export class AdminToursComponent implements OnInit {

  tours:tripFormat[];

  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    this.reloadTrips();
  }

  delTrip(id, index) {
    confirm('Уверены, что хотите удалить поездку?');
    this.load.postData('api/trips/delete', {"id": id})
      .subscribe(
        success => {
          this.tours.splice(index, 1);
        },
        error => {alert('Sending Error')}
      );
  }

  reloadTrips() {
    this.load.getData('api/trips/all').subscribe( res => {
      this.tours = res;
    });
  }

}
