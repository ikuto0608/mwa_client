import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: "profile",
  templateUrl: "app/components/users/profile.component.html",
  styleUrls: ["app/components/users/users.component.css"],
})
export class UsersProfileComponent {
  public user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getProfile()
        .subscribe(
          data => this.user = User.toUser(data.user),
          err => console.log(err),
          () => console.log('done')
        );
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }

  format(timeMilliseconds: any) {
    let timeMillisecondsFormatted = timeMilliseconds.toString();
    while (timeMillisecondsFormatted.length < 6) {
      timeMillisecondsFormatted = "0" + timeMillisecondsFormatted;
    }
    return timeMillisecondsFormatted;
  }
}
