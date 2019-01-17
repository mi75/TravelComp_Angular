import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';

@Component({
  selector: 'from-instagram',
  templateUrl: './from-instagram.component.html',
  styleUrls: ['./from-instagram.component.css'],
  providers: [ApiCallerService]
})
export class FromInstagramComponent implements OnInit {

  instaConnect:boolean = true;
  instaPics:string[];

  constructor(
    private load: ApiCallerService
  ) { }

  ngOnInit() {
    this.load.getData('api/picsFromInstagram')
    .subscribe( 
      res => this.instaPics = res,
      error => {this.instaConnect = false; console.log(error._body)}
    );
  }

}
