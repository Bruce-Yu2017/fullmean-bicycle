import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class MainService {
  user;
 
  constructor(private _http: Http) { }
  
  register(data, callback) {
    this._http.post("/register", data).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
        this.user = res.json();
        console.log(this.user);
    }, 
      (err) => {
        console.log(err);
    })
  }

  login(data, callback) {
    this._http.post("/login", data).subscribe(
      (res) => {
        callback(res.json());
        this.user = res.json();
        console.log(this.user);
        if(res.json().error == undefined){
          this.user = res.json();
          console.log(this.user);
        }
      }, 
      (err) => {
        console.log("error from login service: ", err);
      })
  }

  createBike(data, callback) {
    
    console.log(this.user);
    this._http.post("/user/"+ this.user._id + "/bike", data).subscribe(

      (res) => {
        console.log("create bike success from service");
        console.log("from service createBike: ", res);
        callback(res);
      },
      (err) => {
        console.log("from service createBike: ", err);
      })
  }



}
