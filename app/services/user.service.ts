import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { User } from "../models/user";
import { Config } from "../config";

@Injectable()
export class UserService {
  private loggedIn = false;
  private loginUrl = Config.apiUrl + "auth_user/";
  private userUrl = Config.apiUrl + "users/";

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem("auth_token");
  }

  login(email, password) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http
               .post(this.loginUrl,
                     JSON.stringify({ "email": email, "password": password }),
                     { headers }
               )
               .map((res) => res.json())
               .map((res) => {
                 if (res.success) {
                   localStorage.setItem("auth_token", res.auth_token);
                   this.loggedIn = true;
                 }

                 return res.success;
               });
  }

  logout() {
    localStorage.removeItem("auth_token");
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getRecords() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let authToken = localStorage.getItem("auth_token");
    headers.append("Authorization", `Bearer ${authToken}`);

    return this.http.get("/records", { headers })
               .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let authToken = localStorage.getItem("auth_token");
    headers.append("Authorization", `Bearer ${authToken}`);

    return this.http.get(this.userUrl + "show", { headers })
               .map(res => res.json());
  }

  register(user: User) {
    let body = JSON.stringify({ user: {
                                  name: user.name,
                                  email: user.email,
                                  password: user.password,
                                  password_confirmation: user.passwordConfirmation
                              }});
    let headers = new Headers({"Content-Type": "application/json"});

    return this.http.post(this.userUrl, body, {headers})
               .map(res => res.json())
               .map((res) => {
                 if (res.success) {
                   localStorage.setItem("auth_token", res.auth_token);
                   this.loggedIn = true;
                 }

                 return res.success;
               });
  }

}
