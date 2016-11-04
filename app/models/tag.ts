export class Tag {
  public id: number
  public name: string

  static toTag(json: any): Tag {
    let tag = new Tag
    return Object.assign(tag, json)
  }
}
