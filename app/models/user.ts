export class User {
  public id: number
  public name: string
  public email: string

  static toUser(json: any): User {
    let user = new User()

    return Object.assign(user, json)
  }
}
