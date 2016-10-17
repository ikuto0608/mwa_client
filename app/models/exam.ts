import { Topic } from './topic'
import { Question } from './question'

export class Exam {
  public id: number
  public name: string
  public userId: number
  public categoryId: number
  public numberOfAnswer: number
  public topics: Array<Topic>
  public questions: Array<Question>
  public resultArray: Array<Object>

  constructor() {
    this.topics = new Array<Topic>()
    this.questions = new Array<Question>()
    this.resultArray = new Array<Object>()
  }

  toJson(): any {
    let topics = new Array<any>()

    if (this.topics) {
      this.topics.forEach((topic) => {
        topics.push({ question: topic.question, question_array: topic.questionArray, index_array_of_answer: topic.indexArrayOfAnswer })
      })
    }

    return JSON.stringify({exam: { id: this.id, name: this.name, topics_attributes: topics, result_array: this.resultArray }})
  }

  static toExam(json: any): Exam {
    let exam = Object.create(Exam.prototype)
    return Object.assign(exam, json)
  }
}
