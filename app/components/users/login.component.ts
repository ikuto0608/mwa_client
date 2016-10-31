import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../../services/user.service'

@Component({
  selector: 'login',
  templateUrl: 'app/components/users/login.component.html'
})
export class UsersLoginComponent {
  public email: string
  public password: string

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    console.log(this.password)
    this.userService.login(this.email, this.password)
        .subscribe((result) => {
          if (result) {
            this.router.navigate([''])
          }
        })
  }
}
