export class Category {
  public id: number
  public name: string

  static toCatagory(json: any): Category {
    let category = new Category
    return Object.assign(category, json)
  }
}
