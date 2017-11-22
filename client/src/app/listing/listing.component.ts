import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../main.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  bike = {
    title: "",
    description: "",
    price: "",
    location: "",
    image_url: ""
  }

  user;

  constructor(private _service: MainService, private _router: Router) { }

  createBike() {
    console.log("create success from listing");
    this._service.createBike(this.bike, 
      (res) => {
        console.log(res.json());
      };
      this.bike = {
        title: "",
        description: "",
        price: "",
        location: "",
        image_url: ""
      };
      this._router.navigate(['/browse']);
  }

  ngOnInit() {
    
  }

}
