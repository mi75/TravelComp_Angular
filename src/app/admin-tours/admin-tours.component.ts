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
    this.load.getData('api/trips/all').subscribe( res => {
      this.tours = res;
    });
  }

  delTrip(id, index) {
    confirm('Уверены, что хотите удалить поездку?');
    this.load.postData('api/trips/delete?rowId=' + id, null)
      .subscribe(
        success => {
          this.tours.splice(index, 1);
        },
        error => {alert('Sending Error')}
      );
  }

  insertTrip(thisTour:tripFormat) {
    // console.log(thisTour);
    for (let i=0; i<this.tours.length; i++) {
      if (this.tours[i].id == thisTour.id) {
        this.tours[i] = thisTour;
      };
    };
  }

}
