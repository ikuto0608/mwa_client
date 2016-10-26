import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../services/user.service'

@Component({
  selector: 'login',
  templateUrl: 'app/components/login.component.html'
})
export class LoginComponent {
  public email: string
  public password: string

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.email, this.password)
        .subscribe((result) => {
          if (result) {
            this.router.navigate([''])
          }
        })
  }
}
