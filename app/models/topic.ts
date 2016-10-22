export class Topic {
  public id: number
  public question: string
  public questionArray: Array<string>
  public indexArrayOfAnswer: Array<number>
  public userId: number
  public examId: number
  public volatileJson: {answer: '', correct: ''}

  constructor() {
    this.questionArray = new Array<string>()
    this.indexArrayOfAnswer = new Array<number>()
  }

  get sample() {
    let questionArray = new Array<any>()
    questionArray = this.questionArray.map((q, index) => {
      return q
    })

    this.indexArrayOfAnswer.forEach((index) => {
      questionArray[index] = "( " + questionArray[index] + " )"
    })

    return questionArray.join(' ')
  }

  get sampleAnswered() {
    let questionArray = new Array<any>()

    let i: number = 0
    questionArray = this.questionArray.map((q, index) => {
      if(this.indexArrayOfAnswer.includes(index)) {
        if (!this.volatileJson.correct) {
          q = this.volatileJson.answer[i]
          i += 1
        }
      }
      return q
    })

    this.indexArrayOfAnswer.forEach((index) => {
      questionArray[index] = "( " + questionArray[index] + " )"
    })

    return questionArray.join(' ')
  }

  toJson(): any {
    return JSON.stringify({exam: { id: this.id, question: this.question, question_array: this.questionArray, index_array_of_answer: this.indexArrayOfAnswer, user_id: this.userId, exam_id: this.examId }})
  }

  static toTopic(json: any): Topic {
    let topic = new Topic()
    return Object.assign(topic, json)
  }
}
