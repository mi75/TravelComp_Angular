import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { tripFormat } from "../trip-format";
import { Router } from '@angular/router';

@Component({
  selector: 'admin-tours',
  templateUrl: './admin-tours.component.html',
  styleUrls: ['./admin-tours.component.css'],
  providers: [ApiCallerService]
})
export class AdminToursComponent implements OnInit {

  tours:tripFormat[];

  constructor(
    private load: ApiCallerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reloadTrips();
  }

  delTrip(id, index) {
    if (confirm('Уверены, что хотите удалить поездку?')) {
      this.load.postData('api/admin/deleteTrip', {"id": id})
      .subscribe(
        success => this.tours.splice(index, 1),
        error => error.status=='401' ? this.router.navigate(['login']) : alert('Sending Error')
      );
    }
  }

  reloadTrips() {
    this.load.getData('api/admin/allTrips')
    .subscribe(
      res => this.tours = res,
      error => error.status=='401' ? this.router.navigate(['login']) : alert(error)
    );
  }

}
