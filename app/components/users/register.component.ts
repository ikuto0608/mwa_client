import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "login",
  templateUrl: "app/components/users/register.component.html"
})
export class UsersRegisterComponent {
  public user: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = new User();
  }

  register() {
    this.userService.register(this.user)
        .subscribe((result) => {
          if (result) {
            this.router.navigate([""]);
          }
        });
  }
}
