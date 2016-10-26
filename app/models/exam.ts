import { Topic } from './topic'
import { Question } from './question'

export class Exam {
  public id: number
  public name: string
  public userId: number
  public categoryId: number
  public numberOfAnswer: number
  public topics: Array<Topic>
  public markedTopics: Array<Topic>
  public questions: Array<Question>
  public resultArray: Array<Object>
  public resultTime: number

  constructor() {
    this.topics = new Array<Topic>()
    this.markedTopics = new Array<Topic>()
    this.questions = new Array<Question>()
    this.resultArray = new Array<Object>()
  }

  toJson(): any {
    let topics = new Array<any>()

    if (this.topics) {
      this.topics.forEach((topic) => {
        topics.push({ question: topic.question, description: topic.description, question_array: topic.questionArray, index_array_of_answer: topic.indexArrayOfAnswer })
      })
    }

    return JSON.stringify({exam: { id: this.id, name: this.name, topics_attributes: topics, result_array: this.resultArray, result_time: this.resultTime }})
  }

  static toExam(json: any): Exam {
    let exam = new Exam()
    exam = Object.assign(exam, json)
    exam.markedTopics.forEach((t, index) => {
      exam.markedTopics[index] = Topic.toTopic(t)
    })
    exam.topics.forEach((t, index) => {
      exam.topics[index] = Topic.toTopic(t)
    })

    return Object.assign(exam, json)
  }
}
