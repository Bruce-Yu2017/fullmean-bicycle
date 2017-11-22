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

  err_message = {
    email: "",
    login: ""
  }
  constructor(private _service: MainService, private _router: Router) { }

  register() {
    this._service.register(this.user_reg, (res) => {
      // console.log(res.json());
      console.log("register data sending route");
      if(res === "success") {
        this._router.navigate(['/browse']);
      }
      else {
        this.err_message.email = "This email has been registered."
      }
      this.user_reg = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      };
    });
    
  }

  login() {
    this._service.login(this.user_login, 
      (res) => {
        if(res.error == undefined) {
          this._router.navigate(['/browse']);
        }
        else {
          this.err_message.login = res.error;
        }
      });
    this.user_login = {
      email: "",
      password: ""
    };
  }

  ngOnInit() {
  }

}
