import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_login = {
    email: "",
    password: ""
  }

  user_reg = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  }
  constructor(private _service: MainService, private _router: Router) { }

  register() {
    this._service.register(this.user_reg, (res) => {
      console.log(res.json());
      console.log("register data sending route");
      this.user_reg = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      };
    });
    this._router.navigate(['/browse'])
  }

  login() {
    this._service.login(this.user_login, 
      (res) => {
        console.log("from service login: ", res.json());
        console.log("login data sending route");
        this.user_login = {
          email: "",
          password: ""
        };
      });
    this._router.navigate(['/browse'])
  }

  ngOnInit() {
  }

}
