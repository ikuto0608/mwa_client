export class Topic {
  public id: number
  public question: string
  public questionArray: Array<string>
  public indexArrayOfAnswer: Array<number>
  public userId: number
  public examId: number

  constructor() {
    this.questionArray = new Array<string>()
    this.indexArrayOfAnswer = new Array<number>()
  }
}
