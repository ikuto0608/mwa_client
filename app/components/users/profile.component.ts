import { Component, OnInit } from '@angular/core'

import { UserService } from '../../services/user.service'
import { User } from '../../models/user'

@Component({
  selector: 'profile',
  templateUrl: 'app/components/users/profile.component.html',
})
export class UsersProfileComponent {
  public user: User

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getProfile()
        .subscribe(
          data => this.user = User.toUser(data),
          err => console.log(err),
          () => console.log('done')
        )
  }
}
