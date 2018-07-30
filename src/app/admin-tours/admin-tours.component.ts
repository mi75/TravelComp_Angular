import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'admin-tours',
  templateUrl: './admin-tours.component.html',
  styleUrls: ['./admin-tours.component.css'],
  providers: [ApiCallerService]
})
export class AdminToursComponent implements OnInit {

  tours:object;

  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    this.load.getData('api/trips/all').subscribe( res => {
      this.tours = res;
    });
  }

  delTrip(id) {
    confirm('Are you shure?');
    // let dataToDel = new FormData();
    // dataToDel.set('rowId', id);
    this.load.postData('api/trips/delete?rowId=' + id, null)
      .subscribe(
        res => {
          alert('Deleted');
          this.tours = res;
          console.log(this.tours);
        },
        error => {alert('Sending Error')}
      );
  }

}
